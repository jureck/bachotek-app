import { HashRouter, Routes, Route, Outlet } from "react-router-dom";
import React, { useState } from "react";
import './index.css';
import styled from "styled-components";
import { colors } from "./constants/colors";
import UserPanel from './components/UserPanel';
import Homepage from "./pages/Homepage";
import Alerts from "./pages/Alerts";
import PageTitle from "./components/PageTitle";
import Reservations from "./pages/Reservations";
import NewReservation from "./pages/NewReservation";
import Equipment from "./pages/Equipment";
import EditReservation from "./pages/EditReservation";
import ReservationSummary from "./pages/ReservationSummary";
import UnsignedHomepage from "./pages/UnsignedHomepage";
import SignIn from "./pages/SignIn";
import Clients from "./pages/Clients";
import { useAuth } from "./context/AuthContext";
import Settings from "./pages/Settings";
import axios from "axios";
import { convertToISODate } from "./pages/NewReservation";

const AppContainer = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  width: 100%;
`

function App() {

  const { username } = useAuth();
  const [alertsAmount, setAlertsAmount] = useState(0);
  const [alertTime, setAlertTime] = useState(30);
  console.log(window.location.href);
  const getReservations = async () => {
    console.log("elo");
      const req = await axios.get('http://127.0.0.1:3000/api/reservations', {
          params: {
              date: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,  
              status: "open",
              paid: "all",
          }
      })

      const reservations = [...req.data];

      const date = new Date();
      let currentHours = date.getHours();
      currentHours = ("0" + currentHours).slice(-2);
      let currentMinutes = date.getMinutes();
      currentMinutes = ("0" + currentMinutes).slice(-2);
      reservations.map(async (r, q) => {
          if(r.approxDate < `${currentHours}:${currentMinutes}`) {
              const client = await axios.get(`http://127.0.0.1:3000/api/clients/${r.clientId}`);
              await axios.post('http://127.0.0.1:3000/api/alerts', {
                  addedAt: convertToISODate(new Date()),
                  name: client.data.name,
                  approxTime: r.approxDate,
                  startTime: r.startDate,
              });
          }
          return {};
      })
  }

  const getAlertsAmount = async () => {
    const r = await axios.get('http://127.0.0.1:3000/api/alerts');
    setAlertsAmount(r.data.length);
  }
  
  React.useEffect(() => {
    let timer1 = setInterval(() => getReservations(), alertTime * 60000);
    
    return () => clearInterval(timer1);
  }, [alertTime]);

  React.useEffect(() => {
    
      let timer1 = setInterval(() => getAlertsAmount(), 60000);
      return () => {
          clearInterval(timer1);
      };
  },[]);

  React.useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('http://127.0.0.1:3000/api/settings');
      setAlertTime(res.data[0].alertTime);
    }

    fetch();
  }, []);

  


  const LayoutWithUserPanel = () => {
    return (
      <>
        <UserPanel alertsAmount={alertsAmount}/>
        <PageTitle />
        <Outlet />
      </>
    );
  }
  
  const SignedInLayout = () => {
    return (
      <Route path="/" element={<LayoutWithUserPanel />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/alerty" element={<Alerts />} />
        <Route path="/rezerwacje" element={<Reservations />} />
        <Route path="/nowa-rezerwacja" element={<NewReservation />} />
        <Route path="/edytuj-rezerwacje/:id" element={<EditReservation />} />
        <Route path="/sprzet" element={<Equipment />} />
        <Route path="/klienci" element={<Clients />} />
        <Route path="/podsumowanie-rezerwacji/:id" element={<ReservationSummary />} />
        <Route path="/ustawienia" element={<Settings />} />
      </Route>
    );
  }
  
  const SignedOutLayout = () => {
    return (
      <Route path="/" element={<LayoutWithUserPanel />}>
        <Route path="/" element={<UnsignedHomepage />} />
        <Route path="/zaloguj-sie" element={<SignIn />} />
      </Route>
    );
  }

  
  return (
      <AppContainer>
        <HashRouter>
          <Routes>
            {
              username ?
                SignedInLayout()
              :
                SignedOutLayout()

            }
          </Routes>
        </HashRouter>
      </AppContainer>
  );
}





export default App;
