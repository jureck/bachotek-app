import React, { useState } from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import Input from "../../components/Input";
import Kayak from "../../assets/icons/kayak.png";
import Oar from "../../assets/icons/oar.png";
import Jacket from "../../assets/icons/jacket.png";
import Boat from "../../assets/icons/boat.png";
import Button from "../../components/Button";

const Wrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 20px;
`
const UserData = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    margin: 40px 20px;
`
const ReservationDetails = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`
const DataWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &:nth-child(5) {
        margin-top: 30px;
    }
`
const DataTitle = styled.p`
    font-size: ${fontSizes.s};
    font-weight: 500;
    width: 190px;
    margin: 2px 0px;
`
const DataContent = styled.p`
    font-size: ${fontSizes.s};
    width: 250px;
    margin: 2px 0px 2px 10px;
`
const EndTimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
`
const EndTimeHeader = styled.p`
    font-size: ${fontSizes.xm};
    font-weight: 500;
`
const Table = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
const Separator = styled.div`
    background-color: black;
    height: 2px;
    width: 100%;
    margin: 10px 0px;
`
const Cost = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    font-size: ${fontSizes.s};
    width: 100%;
    margin-bottom: 30px;
`
const TableHeader = styled.p`
    font-size: ${fontSizes.s};
    font-weight: 600;
    width: 20%;
    text-align: center;
    margin: 10px 0px;
`
const Headers = styled.div`
    display: flex;
    flex-direction: row;
`
const Item = styled.div`
    display: flex;
    flex-direction: row;
    font-size: ${fontSizes.xm};
    font-weight: 500;
    color: ${colors.fontGray};
    margin-bottom: 5px;
`
const ItemImage = styled.div`
    background-color: ${colors.primary};
    border-radius: 20px;
    width: 20%;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const ItemLogo = styled.img`
    width: 50px;
`
const ItemName = styled.span`
    color: white;
    font-weight: 500;
    margin-top: 10px;
    font-size: ${fontSizes.s};
`
const ItemAmount = styled.span`
    width: 20%;
    line-height: 80px;
    text-align: center;
`
const ItemCostPerHour = styled.span`
    width: 20%;
    line-height: 80px;
    text-align: center;
`
const ItemHourAmount = styled.span`
    width: 20%;
    line-height: 80px;
    text-align: center;
`
const ItemValue = styled.span`
    width: 20%;
    line-height: 80px;
    text-align: center;
`
const Sum = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
`
const CostTitle = styled.span`
    font-weight: 500;
    text-align: right;
`
const CostData = styled.span`
    width: 20%;
    text-align: center;
    margin-bottom: 10px;
`
const Discount = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    color: ${colors.primary};
`
const TotalCost = styled.div`
    font-weight: 600;
    font-size: ${fontSizes.xm};
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    color: red;
`
const DelayCost = styled.div`
    color: ${colors.lightRed};
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
`
const Prepayment = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    color: ${colors.primary};
`




const ReservationSummary = () => {
    return ( 
        <PageContent>
            <Wrapper>
                <UserData>
                    <DataWrapper>
                        <DataTitle>Imię i nazwisko</DataTitle>
                        <DataContent>Władysław Kosiniecki</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Telefon</DataTitle>
                        <DataContent>123456789</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>PESEL</DataTitle>
                        <DataContent>12312312312</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Nr dowodu</DataTitle>
                        <DataContent>ABC123123</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Godz. rozpoczęcia</DataTitle>
                        <DataContent>10:00</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Orient. godz. spływu</DataTitle>
                        <DataContent>12:00</DataContent>
                    </DataWrapper>

                    <EndTimeContainer>
                        <EndTimeHeader>
                            Faktyczna godz. spływu:
                        </EndTimeHeader>
                        <Input type="time" name="EndTime" label="" min="9:00" max="19:00" height="60" width="110"/>
                    </EndTimeContainer>
                    <Button height="80" bgColor={colors.primary} hoverColor={colors.primaryHover} text="Zakończ rezerwację" textColor="white" />
                </UserData>
                <ReservationDetails>
                    <Table>
                        <Headers>
                            <TableHeader>Typ sprzętu</TableHeader>
                            <TableHeader>Ilość</TableHeader>
                            <TableHeader>Cena za godz.</TableHeader>
                            <TableHeader>Ilość godzin</TableHeader>
                            <TableHeader>Wartość</TableHeader>
                        </Headers>

                        <Item>
                            <ItemImage>
                                <ItemLogo src={Kayak}/>
                                <ItemName>Kajak</ItemName>
                            </ItemImage>
                            <ItemAmount>1</ItemAmount>
                            <ItemCostPerHour>20 zł</ItemCostPerHour>
                            <ItemHourAmount>2</ItemHourAmount>
                            <ItemValue>40 zł</ItemValue>
                        </Item>

                        <Item>
                            <ItemImage>
                                <ItemLogo src={Kayak}/>
                                <ItemName>Kajak</ItemName>
                            </ItemImage>
                            <ItemAmount>1</ItemAmount>
                            <ItemCostPerHour>20 zł</ItemCostPerHour>
                            <ItemHourAmount>2</ItemHourAmount>
                            <ItemValue>40 zł</ItemValue>
                        </Item>

                        <Item>
                            <ItemImage>
                                <ItemLogo src={Kayak}/>
                                <ItemName>Kajak</ItemName>
                            </ItemImage>
                            <ItemAmount>1</ItemAmount>
                            <ItemCostPerHour>20 zł</ItemCostPerHour>
                            <ItemHourAmount>2</ItemHourAmount>
                            <ItemValue>40 zł</ItemValue>
                        </Item>

                        <Item>
                            <ItemImage>
                                <ItemLogo src={Kayak}/>
                                <ItemName>Kajak</ItemName>
                            </ItemImage>
                            <ItemAmount>1</ItemAmount>
                            <ItemCostPerHour>20 zł</ItemCostPerHour>
                            <ItemHourAmount>2</ItemHourAmount>
                            <ItemValue>40 zł</ItemValue>
                        </Item>

                    </Table>
                    <Separator />
                    <Cost>
                        <Sum>
                            <CostTitle>Suma</CostTitle>
                            <CostData>120 zł</CostData>
                        </Sum>
                        <DelayCost>
                            <CostTitle>Dopłata za spóźnienie</CostTitle>
                            <CostData>20 zł</CostData>
                        </DelayCost>
                        <Prepayment>
                            <CostTitle>Zaliczka</CostTitle>
                            <CostData>-20zł</CostData>
                        </Prepayment>
                        <Discount>
                            <CostTitle>Zniżka 10%</CostTitle>
                            <CostData>-12zł</CostData>
                        </Discount>
                        <TotalCost>
                            <CostTitle>RAZEM</CostTitle>
                            <CostData>108 zł</CostData>
                        </TotalCost>
                    </Cost>
                </ReservationDetails>
            </Wrapper>
        </PageContent>
    );
}
  
export default ReservationSummary;