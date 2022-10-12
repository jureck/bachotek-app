import styled from "styled-components";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import AlertIcon from "../../assets/icons/alert.png";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import PTTK from "../../assets/icons/logo.png";

const Panel = styled.div`
    width: 95%;
    height: 105px;
    margin: auto;
    padding: 30px 0px 40px 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const LoggedAs = styled.p`
    margin: 0;
    padding: 0;
    font-size: ${fontSizes.l};
    font-weight: 600;
`
const Username = styled.span`
    margin-left: 10px;
    color: ${colors.primary};
    font-size: ${fontSizes.l};
    font-weight: 600;
`
const Controls = styled.div`
    display: flex;
    flex-direction: row;
`
const SignToggle = styled(Link)`
    text-align: center;
    text-decoration: none;
    line-height: 35px;
    cursor: pointer;
    display: block;
    border: 0;
    background-color: white;
    color: black;
    font-weight: 500;
    height: 35px;
    width: 140px;
    font-size: ${fontSizes.s};
    border-radius: 10px;
    margin-left: 60px;
    padding: 0;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${colors.whiteOnHover};
    }
`
const Alerts = styled(Link)`
    color: black;
    text-decoration: none;
    cursor: pointer;
    height: 35px;
    width: 80px;
    margin-left: 20px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.alertsamount ? '#FFA3A3' : 'white'};
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${props => props.alertsamount ? colors.lightRed : 'white' };
    }
`
const AlertsIcon = styled.img`
    width: 20px;
    height: 20px;
`
const AlertsAmount = styled.span`
    font-weight: 600;
    margin: 0px 0px 0px 8px;
    font-size: ${fontSizes.s};
`
const Logo = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
`
const LogoImage = styled.img`
    height: 80px;
`
const AppName = styled.span`
    margin-top: 5px;
    font-size: ${fontSizes.s};
    font-weight: 600;
    color: ${colors.fontGray};
    letter-spacing: 1px;
`


const UserPanel = () => {

    const { username, userSignOut } = useAuth();
    const alertsAmount = 1;
    const navigate = useNavigate();
    
    const handleSignout = async () => {
        try {
            userSignOut();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
        { username ?
                <Panel>
                    <Logo onClick={() => navigate("/")}>
                        <LogoImage src={PTTK} />
                        <AppName>System Rezerwacji</AppName>
                    </Logo>
                    <LoggedAs>
                        Zalogowany jako
                        <Username>{username}</Username>
                    </LoggedAs>
                    <Controls>
                        <SignToggle onClick={handleSignout}>Wyloguj się</SignToggle>
                        <Alerts to="/alerty" alertsamount={alertsAmount}>
                            <AlertsIcon src={AlertIcon} />
                            <AlertsAmount>{alertsAmount}</AlertsAmount>
                        </Alerts>
                    </Controls>
                </Panel>
            :
                <Panel>
                    <Logo>
                        <LogoImage src={PTTK} />
                        <AppName>System Rezerwacji</AppName>
                    </Logo>
                    <LoggedAs>
                        Jesteś
                        <Username>niezalogowany</Username>
                    </LoggedAs>
                    <Controls>
                        <SignToggle to="/zaloguj-sie">Zaloguj się</SignToggle>
                    </Controls>
                </Panel>
        }
        </>
    );
}

export default UserPanel;