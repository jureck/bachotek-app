import React from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import { useNavigate } from "react-router-dom";
import Close from "../../assets/icons/close.png";

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
`
const AlertContent = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 20px;
    min-height: 90px;
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 22%;
    padding: 1%;

    &:first-child {
        width: 10%;
        padding-left: 40px;
    }

    &:nth-child(2) {
        width: 15%;
    }

    &:nth-child(3) {
        width: 15%;
    }
`
const ColumnTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;
`
const ColumnContent = styled.span`
    font-size: ${fontSizes.s};
`
const CloseWrapper = styled.div`
    width: 5%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
const CloseIcon = styled.img`
    height: 30px;
    cursor: pointer;
    margin-right: 40px;
`

const Alerts = (props) => {

    const navigate = useNavigate();
    const alertsAmount = 1;

    React.useEffect(() => {
        if(!alertsAmount) navigate(-1);
    }, [navigate]);

    return ( 
        <PageContent>
            <AlertWrapper>
                <AlertTime>21:37</AlertTime>
                <AlertContent>
                    <Column>
                        <ColumnTitle>Typ alertu</ColumnTitle>
                        <ColumnContent>Opóźnienie</ColumnContent>
                    </Column>
                    <Column>
                        <ColumnTitle>Imię i nazwisko</ColumnTitle>
                        <ColumnContent>Jacek Isicki</ColumnContent>
                    </Column>
                    <Column>
                        <ColumnTitle>Typ sprzętu</ColumnTitle>
                        <ColumnContent>Kajak</ColumnContent>
                    </Column>
                    <Column>
                        <ColumnTitle>Godz. rozpoczęcia</ColumnTitle>
                        <ColumnContent>9:00</ColumnContent>
                    </Column>
                    <Column>
                        <ColumnTitle>Orient. godz. spływu</ColumnTitle>
                        <ColumnContent>10:00</ColumnContent>
                    </Column>
                    <CloseWrapper>
                        <CloseIcon src={Close}/>
                    </CloseWrapper>
                </AlertContent>
            </AlertWrapper>

            
        </PageContent>
    );
}
 
export default Alerts;