import React, { useState } from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/icons/close.png";
import axios from "axios";

const AlertWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const AlertTime = styled.span`
    display: block;
    font-size: ${fontSizes.s};
    color: ${colors.fontGray};
    margin-top: 20px;
    margin-left: 40px;
    font-weight: 500;

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xs};
        margin-left: 25px;
    }
`
const AlertContent = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 20px;
    min-height: 70px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;

    @media screen and (max-width: 1100px) {
        min-height: 150px;
        flex-wrap: wrap;
    }
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 22%;
    padding: 1%;

    @media screen and (max-width: 1100px) {
        width: 30%;
    }

    @media screen and (max-width: 800px) {
        width: 46%;
    }

    @media screen and (max-width: 600px) {
        margin-bottom: 5px;
    }

`
const ColumnTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xs};
    }
`
const ColumnContent = styled.span`
    font-size: ${fontSizes.s};

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }
`
const CloseWrapper = styled.div`
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width: 1100px) {
        position: absolute;
        right: 5%;
        height: 60px;
    }

    @media screen and (max-width: 600px) {
        height: 35px;
    }
`
const CloseIcon = styled.img`
    display: block;
    height: 30px;
    cursor: pointer;
    margin-right: 40px;
    transition: all .1s ease-in-out;

    &:hover {
        transform: scale(1.4);
    }

    @media screen and (max-width: 1100px) {
        margin-right: 0px;
    }

    @media screen and (max-width: 600px) {
        height: 20px;
    }
`

const Alerts = () => {

    const [alerts, setAlerts] = useState([]);
    const location = "https://bachotek-app-api.onrender.com";

    const deleteAlert = async (id) => {
        const r = await axios.delete(`${location}/api/alerts/${id}`);
        if(r.status === 204) {
            const r = await axios.get(`${location}/api/alerts`);
            setAlerts([...r.data]);
        }
    }

   
    React.useEffect(() => {
        const req = async () => {
            const r = await axios.get(`${location}/api/alerts`);
            setAlerts([...r.data]);
        }
        req();
    }, []);
    
    return ( 
        <PageContent>
            {alerts.length ? alerts.map((alert, q) => {
                const date = alert.addedAt.slice(0, -13);
                let time = alert.addedAt.slice(11, -7);
                return  <AlertWrapper key={q}>
                            <AlertTime>{`${date} ${time}`}</AlertTime>
                            <AlertContent>
                                <Column>
                                    <ColumnTitle>Typ alertu</ColumnTitle>
                                    <ColumnContent>Opóźnienie</ColumnContent>
                                </Column>
                                <Column>
                                    <ColumnTitle>Imię i nazwisko</ColumnTitle>
                                    <ColumnContent>{alert.name}</ColumnContent>
                                </Column>
                                <Column>
                                    <ColumnTitle>Godz. rozpoczęcia</ColumnTitle>
                                    <ColumnContent>{alert.startTime}</ColumnContent>
                                </Column>
                                <Column>
                                    <ColumnTitle>Orient. godz. spływu</ColumnTitle>
                                    <ColumnContent>{alert.approxTime}</ColumnContent>
                                </Column>
                                <CloseWrapper>
                                    <CloseIcon onClick={() => deleteAlert(alert._id)} src={Close}/>
                                </CloseWrapper>
                            </AlertContent>
                        </AlertWrapper>
            }) : null}
           
        </PageContent>
    );
}
 
export default Alerts;