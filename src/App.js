import { HashRouter, Routes, Route, Outlet } from "react-router-dom";
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
import EditEquipment from "./pages/EditEquipment";
import EditReservation from "./pages/EditReservation";
import ReservationSummary from "./pages/ReservationSummary";
import UnsignedHomepage from "./pages/UnsignedHomepage";
import SignIn from "./pages/SignIn";
import { useAuth } from "./context/AuthContext";
import Settings from "./pages/Settings";

const AppContainer = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  width: 100%;
`

function App() {

  const { username } = useAuth();
  
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

const LayoutWithUserPanel = () => {
  return (
    <>
      <UserPanel />
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
      <Route path="/edytuj-sprzet" element={<EditEquipment />} />
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



export default App;
