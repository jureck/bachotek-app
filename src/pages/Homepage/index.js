import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Tiles = styled.section`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 1000px) {
        flex-wrap: wrap;
    }
    
`
const Tile = styled(Link)`
    cursor: pointer;
    width: 350px;
    height: 70px;
    background-color: white;
    border-radius: 20px;
    padding: 20px 30px 40px 30px;
    margin-right: 30px;
    transition: all .1s ease-in-out;
    text-decoration: none;

    &:hover {
        background-color: ${colors.whiteOnHover};
    }

    @media screen and (max-width: 1000px) {
        margin-right: 20px;
        width: 290px;
        margin-bottom: 20px;
    }

    @media screen and (max-width: 800px) {
        margin-right: 0px;
        width: 100%;
        margin-bottom: 20px;
    }
`
const Title = styled.p`
    font-weight: 500;
    font-size: ${fontSizes.m};
    margin: 0;
    color: black;
`
const Subtitle = styled.p`
    color: ${colors.fontGray};
    font-size: ${fontSizes.s};
    margin: 20px 0px 0px 0px;
`

const Homepage = () => {

    const { username } = useAuth();

    return (
        <PageContent>
            <Tiles>
                <Tile to="/rezerwacje">
                    <Title>Rezerwacje</Title>
                    <Subtitle>Zarządzaj rezerwacjami</Subtitle>
                </Tile>
                <Tile to="/sprzet">
                    <Title>Sprzęt</Title>
                    <Subtitle>Posiadany sprzęt oraz jego status</Subtitle>
                </Tile>
                {
                    username === "Admin" ? 
                        <Tile to="/ustawienia">
                            <Title>Ustawienia</Title>
                            <Subtitle>Dostosuj ustawienia aplikacji</Subtitle>
                        </Tile>
                    : null
                }
                {
                    username === "Admin" ? 
                        <Tile to="/klienci">
                            <Title>Klienci</Title>
                            <Subtitle>Zobacz zapisanych klientów</Subtitle>
                        </Tile>
                    : null
                }
            </Tiles>
        </PageContent>
    );
}

export default Homepage;