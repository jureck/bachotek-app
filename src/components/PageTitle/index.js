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
`
const Title = styled.p`
    padding: 0;
    margin: 0;
    font-size: ${fontSizes.l};
    font-weight: 600;
`

const PageTitle = () => {

    const navigate = useNavigate();
    let title = useLocation().pathname.slice(1);
    if(title === "alerty") title = "Alerty";

    return (
        title ?
        <Wrapper>
            <Arrow onClick={() => navigate(-1)} src={BackArrow} />
            <Title>
                {title}
            </Title>
        </Wrapper>
        : null
    );
}
 
export default PageTitle;