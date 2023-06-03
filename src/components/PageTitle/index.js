import styled from "styled-components";
import { fontSizes } from "../../constants/fontSizes";
import { useLocation } from 'react-router-dom';
import BackArrow from '../../assets/icons/back_arrow.png';
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    width: 95%;
    margin: 0px auto;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
`
const Arrow = styled.img`
    cursor: pointer;
    display: block;
    height: 25px;
    margin-left: 35px;
    margin-right: 30px;

    @media screen and (max-width: 500px) {
        height: 20px;
        margin-left: 10px;
        margin-right: 20px;
    }
`
const Title = styled.p`
    padding: 0;
    margin: 0;
    font-size: ${fontSizes.m};
    font-weight: 600;

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xm};
    }
`

const PageTitle = () => {

    const navigate = useNavigate();
    let title = useLocation().pathname.slice(1);
    if(title === "alerty") title = "Alerty";
    if(title === "rezerwacje") title = "Rezerwacje";
    if(title === "nowa-rezerwacja") title = "Dodawanie rezerwacji";
    if(title === "sprzet") title = "Sprzęt";
    if(title === "edytuj-sprzet") title = "Edycja stanu sprzętu";
    if(title.includes("edytuj-rezerwacje")) title = "Edycja rezerwacji";
    if(title.includes("podsumowanie-rezerwacji")) title = "Podsumowanie rezerwacji";
    if(title === "zaloguj-sie") title = "Zaloguj się";
    if(title === "ustawienia") title = "Ustawienia";
    if(title === "klienci") title = "Klienci";



    return (
        title ?
        <Wrapper>
            <Arrow onClick={() => navigate("/")} src={BackArrow} />
            <Title>
                {title}
            </Title>
        </Wrapper>
        : null
    );
}
 
export default PageTitle;