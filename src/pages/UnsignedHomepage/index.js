import styled from "styled-components";
import { fontSizes } from "../../constants/fontSizes";

const Info = styled.p`
    font-weight: 600;
    font-size: ${fontSizes.m};
    width: 95%;
    padding-left: 60px;
    margin: auto;
`

const UnsignedHomepage = () => {
    return ( 
        <Info>Zaloguj się, aby zarządzać rezerwacjami i sprzętem.</Info>
    );
}
 
export default UnsignedHomepage;