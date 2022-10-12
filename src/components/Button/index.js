import styled from "styled-components";
import { fontSizes } from "../../constants/fontSizes";

const StyledButton = styled.button`
    cursor: pointer;
    color: ${props => props.textColor};
    background-color: ${props => props.bgColor};
    border: 0;
    border-radius: 10px;
    height: ${props => `${props.height}px`};
    font-size: ${fontSizes.s};
    font-weight: 500;
    padding: 0px 20px;
    margin: 5px;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${props => props.hoverColor};
    }
`

const Button = ({ type = "submit", bgColor, textColor, hoverColor, text, height = 45, onClick }) => {
    return ( 
        <StyledButton onClick={onClick} type={type} bgColor={bgColor} textColor={textColor} hoverColor={hoverColor} height={height}>
            {text}
        </StyledButton>
    );
}
 
export default Button;