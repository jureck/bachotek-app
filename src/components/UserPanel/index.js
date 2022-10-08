import styled from "styled-components";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import AlertIcon from "../../assets/icons/alert.png";
import { Link } from 'react-router-dom';

const Panel = styled.div`
    width: 95%;
    height: 50px;
    margin: auto;
    padding: 60px 0px 40px 60px;
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
const SignOut = styled.button`
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
    margin-left: 120px;
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


const UserPanel = () => {

    const user = "Admin";
    const alertsAmount = 1;

    return (
        <Panel>
            <LoggedAs>
                Zalogowany jako
                <Username>
                    {user}
                </Username>
            </LoggedAs>
            <Controls>
                <SignOut>
                    Wyloguj się
                </SignOut>
                <Alerts to="/alerty" alertsamount={alertsAmount}>
                    <AlertsIcon src={AlertIcon} />
                    <AlertsAmount>
                        {alertsAmount}
                    </AlertsAmount>
                </Alerts>
            </Controls>
        </Panel>
    );
}

export default UserPanel;