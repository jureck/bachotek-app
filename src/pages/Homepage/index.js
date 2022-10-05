import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";

const Tiles = styled.section`
    display: flex;
    flex-direction: row;
    
`
const Tile = styled.article`
    cursor: pointer;
    width: 350px;
    height: 70px;
    background-color: white;
    border-radius: 20px;
    padding: 20px 30px 40px 30px;
    margin-right: 30px;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${colors.whiteOnHover};
    }
`
const Title = styled.p`
    font-weight: 500;
    font-size: ${fontSizes.m};
    margin: 0;
`
const Subtitle = styled.p`
    color: ${colors.fontGray};
    font-size: ${fontSizes.s};
    margin: 20px 0px 0px 0px;
`

const Homepage = () => {
    return (
        <PageContent>
            <Tiles>
                <Tile>
                    <Title>Rezerwacje</Title>
                    <Subtitle>Zarządzaj rezerwacjami</Subtitle>
                </Tile>
                <Tile>
                    <Title>Sprzęt</Title>
                    <Subtitle>Posiadany sprzęt oraz jego status</Subtitle>
                </Tile>
                <Tile>
                    <Title>Ustawienia</Title>
                    <Subtitle>Dostosuj ustawienia aplikacji</Subtitle>
                </Tile>
            </Tiles>
        </PageContent>
    );
}

export default Homepage;