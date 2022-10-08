import styled from "styled-components";
import { fontSizes } from "../../constants/fontSizes";
import { colors } from "../../constants/colors";

const Token = styled.div`
    background-color: ${props => props.isSelected ? colors.primary : colors.secondary};
    color: ${props => props.isSelected ? "white" : "black"};
    padding: 7px 20px;
    border-radius: 20px;
    font-size: ${fontSizes.s};
    font-weight: 400;
    margin: 2px 2px;
    cursor: pointer;
    transition: all .1s ease-in-out;
    
    &:hover {
        background-color: ${props => props.isSelected ? colors.primaryHover : colors.secondaryHover};
    }
`

const ToggleToken = ({isSelected, children}) => {
    return ( 
        <Token isSelected={isSelected}>{children}</Token>
    );
}
 
export default ToggleToken;