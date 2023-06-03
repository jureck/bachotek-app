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
    -moz-user-select: none;  
    -webkit-user-select: none;  
    -ms-user-select: none;  
    -o-user-select: none;  
    user-select: none;
    
    &:hover {
        background-color: ${props => props.isSelected ? colors.primaryHover : colors.secondaryHover};
    }
`

const ToggleToken = ({isSelected, children, onClick}) => {
    return ( 
        <Token isSelected={isSelected} onClick={onClick}>{children}</Token>
    );
}
 
export default ToggleToken;