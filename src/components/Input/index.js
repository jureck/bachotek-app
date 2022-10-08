import styled from "styled-components";
import { fontSizes } from "../../constants/fontSizes";
import { colors } from "../../constants/colors";

const InputElement = styled.input`
    width: ${props => `${props.width}px`};
    background-color: ${colors.secondary};
    border: 0;
    border-radius: 10px;
    height: 40px;
    font-size: ${fontSizes.s};
    text-align: center;
    margin-bottom: 10px;
`
const Label = styled.label`
    margin-right: 10px;
    font-size: ${fontSizes.s};
`

const Input = ({width, type, name, value, label, min, max}) => {
    return (
        <>
            <Label htmlFor={name}>{label}</Label>
            <InputElement name={name} width={width} type={type} value={value} min={min} max={max}/>
        </>
    );
}
 
export default Input;