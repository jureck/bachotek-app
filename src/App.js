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

const AppContainer = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  width: 100%;
`

function App() {
  return (
    <AppContainer>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LayoutWithUserPanel />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/alerty" element={<Alerts />} />
            <Route path="/rezerwacje" element={<Reservations />} />
            <Route path="/nowa-rezerwacja" element={<NewReservation />} />
            <Route path="/sprzet" element={<Equipment />} />
          </Route>
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

export default App;
