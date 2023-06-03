import styled from "styled-components";
import { fontSizes } from "../../constants/fontSizes";
import { colors } from "../../constants/colors";

const InputElement = styled.input`
    width: ${props => `${props.width}px`};
    background-color: ${props => props.bgColor};
    border: 0;
    border-radius: 10px;
    height: ${props => `${props.height}px`};
    font-size: ${fontSizes.s};
    padding-left: 10px;
    margin-bottom: 10px;
    margin-left: 15px;

    @media screen and (max-width: 700px) {
        font-size: ${fontSizes.xs};
        width: ${props => `${props.width * 0.8}px`};
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
        height: ${props => `${props.height * 0.8}px`};
        width: ${props => `${props.width * 0.7}px`};
        margin-left: 5px;
    }
`
const Label = styled.label`
    font-size: ${fontSizes.s};
    font-weight: 500;

    @media screen and (max-width: 700px) {
        font-size: ${fontSizes.xs};
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }

    @media screen and (max-width: 400px) {
        font-size: 11px;
    }
`

const Input = ({width = 200, type = "text", name, value, label, min, max, height = 40, bgColor = colors.secondary, onChange, readOnly}) => {
    return (
        <>
            <Label htmlFor={name}>
                {label}
                <InputElement {...readOnly ? readOnly : null} name={name} width={width} type={type} value={value} min={min} max={max} height={height} bgColor={bgColor} onChange={onChange}/>
            </Label>
        </>
    );
}
 
export default Input;