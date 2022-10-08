import styled from "styled-components";
import { fontSizes } from "../../constants/fontSizes";
import { colors } from "../../constants/colors";

const InputElement = styled.input`
    width: ${props => `${props.width}px`};
    background-color: ${colors.secondary};
    border: 0;
    border-radius: 10px;
    height: ${props => `${props.height}px`};
    font-size: ${fontSizes.s};
    padding-left: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
`
const Label = styled.label`
    font-size: ${fontSizes.s};
    font-weight: 500;
`

const Input = ({width = 200, type = "text", name, value, label, min, max, height = 40}) => {
    return (
        <>
            <Label htmlFor={name}>
                {label}
                <InputElement name={name} width={width} type={type} value={value} min={min} max={max} height={height}/>
            </Label>
        </>
    );
}
 
export default Input;