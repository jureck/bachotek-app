import { HashRouter, Routes, Route, Outlet } from "react-router-dom";
import './index.css';
import styled from "styled-components";
import { colors } from "./constants/colors";
import UserPanel from './components/UserPanel';
import Homepage from "./pages/Homepage";

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
            <Route path="/" element={<Homepage />}/>
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
      <Outlet />
    </>
  );
}

export default App;
