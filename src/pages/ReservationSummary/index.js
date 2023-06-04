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
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    background-color: white;
    border-radius: 20px;

    @media screen and (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
    }
`
const UserData = styled.div`
    width: 35%;
    display: flex;
    flex-direction: column;
    margin: 40px 20px;

    @media screen and (max-width: 1200px) {
        width: 90%;
    }
`
const ReservationDetails = styled.div`
    width: 65%;
    display: flex;
    flex-direction: column;
    margin-right: 20px;

    @media screen and (max-width: 1200px) {
        width: 90%;
    }
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
    min-width: 170px;
    margin: 2px 0px;

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xs};
        min-width: 150px;
    }

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xxs};
    }
`
const DataContent = styled.p`
    font-size: ${fontSizes.s};
    width: 250px;
    margin: 2px 0px 2px 10px;

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xs};
    }

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xxs};
    }
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

    @media screen and (max-width: 700px) {
        font-size: ${fontSizes.xs};
    } 

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    } 
`
const Headers = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`
const Item = styled.div`
    display: flex;
    flex-direction: row;
    font-size: ${fontSizes.xm};
    font-weight: 500;
    color: ${colors.fontGray};
    margin-bottom: 5px;
    justify-content: center;

    @media screen and (max-width: 700px) {
        font-size: ${fontSizes.xs};
        align-items: center;
    } 
`
const ItemImage = styled.div`
    background-color: ${colors.primary};
    border-radius: 20px;
    width: 16%;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 20px;

    @media screen and (max-width: 500px) {
        height: 50px;
        border-radius: 15px;
        width: 20%;
        margin-left: 0px;
    } 
`
const ItemLogo = styled.img`
    width: 50px;

    @media screen and (max-width: 500px) {
        width: 30px;
    } 
`
const ItemName = styled.span`
    color: white;
    font-weight: 500;
    margin-top: 10px;
    font-size: ${fontSizes.s};

    @media screen and (max-width: 500px) {
        margin-top: 5px;
        font-size: ${fontSizes.xxs};
    } 
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
    const navigate = useNavigate();
    const { id: rId } = useParams();
    const [endTime, setEndTime] = useState("");
    const [client, setClient] = useState({});
    const [startTime, setStartTime] = useState("");
    const [approxTime, setApproxTime] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [hours, setHours] = useState(0);
    const imageList = {
        Kajak: Kayak,
        Łódka: Boat,
        Kapok: Jacket,
        Wiosło: Oar
    }
    const [paid, setPaid] = useState(0);
    const [cost, setCost] = useState(0);
    const [isDiscount, setIsDiscount] = useState(false);
    const location = "https://bachotek-app-api-production.up.railway.app"

    const endReservation = async () => {
        if(endTime.length > 1) {
            const res = await axios.get(`${location}/api/reservations/${rId}`);
            const { data } = res;
            const eq = [...data.equipment];
            eq.forEach(async el => {
                if(el.type === "Łódka") {
                    const boat = await axios.get(`${location}/api/equipment/number`, { params: { name: "Łódka", number: el.number } });
                    const boatId = boat.data[0];
                    await axios.put(`${location}/api/equipment/${boatId._id}`,  {
                        _id: boatId._id,
                        name: "Łódka",
                        amount: 1,
                        number: el.number,
                        status: "available"
                    });
                } else {
                    const eq = await axios.get(`${location}/api/equipment`, { params: { name: el.type } });
                    const eqId = eq.data[0];
                    await axios.put(`${location}/api/equipment/${eqId._id}`,  {
                        _id: eqId._id,
                        name: el.type,
                        amount: eqId.amount + el.amount,
                        number: 1,
                        status: eqId.amount + el.amount > 0 ? "available" : "notAvailable"
                    });
                }
            })
            const editedReservation = await axios.put(`${location}/api/reservations/${rId}`, {
                _id: rId,
                status: "close",
                addedAt: res.data.addedAt,
                startDay: res.data.startDay,
                clientId: res.data.clientId,
                equipment: res.data.equipment,
                startDate: res.data.startDate,
                approxDate: res.data.approxDate,
                endDate: endTime,
                cost: res.data.cost,
                paid: res.data.cost,
                comments: res.data.comments
            });
            if(editedReservation.status === 201) navigate("/rezerwacje");
        }
    }

    React.useEffect(() => {
        const res = async () => {
            const reservation = await axios.get(`${location}/api/reservations/${rId}`);
            const client = await axios.get(`${location}/api/clients/${reservation.data.clientId}`);
            setStartTime(reservation.data.startDate);
            setApproxTime(reservation.data.approxDate);
            setEquipment(reservation.data.equipment);
            setIsDiscount(client.data.isDiscount);
            setPaid(reservation.data.paid);
            setCost(reservation.data.cost);
            setHours(Number(reservation.data.approxDate.slice(0, -3)) - Number(reservation.data.startDate.slice(0, -3)));
            setClient({
                name: client.data.name,
                phone: client.data.phone,
                pesel: client.data.pesel,
                id: client.data.id,
                isDiscount: client.data.isDiscount
            })
        }

        res();
    }, []);
    
 
    return ( 
        <PageContent>
            <Wrapper>
                <UserData>
                    <DataWrapper>
                        <DataTitle>Imię i nazwisko</DataTitle>
                        <DataContent>{client.name}</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Telefon</DataTitle>
                        <DataContent>{client.phone}</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>PESEL</DataTitle>
                        <DataContent>{client.pesel}</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Nr dowodu</DataTitle>
                        <DataContent>{client.id}</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Godz. rozpoczęcia</DataTitle>
                        <DataContent>{startTime}</DataContent>
                    </DataWrapper>
                    <DataWrapper>
                        <DataTitle>Orient. godz. spływu</DataTitle>
                        <DataContent>{approxTime}</DataContent>
                    </DataWrapper>

                    <EndTimeContainer>
                        <EndTimeHeader>
                            Faktyczna godz. spływu:
                        </EndTimeHeader>
                        <Input value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" name="EndTime" label="" min="9:00" max="19:00" height="60" width="110"/>
                    </EndTimeContainer>
                    <Button onClick={endReservation} height="80" bgColor={colors.primary} hoverColor={colors.primaryHover} text="Zakończ rezerwację" textColor="white" />
                </UserData>
                <ReservationDetails>
                    <Table>
                        <Headers>
                            <TableHeader>Typ sprzętu</TableHeader>
                            <TableHeader>Ilość</TableHeader>
                            <TableHeader>Ilość godzin</TableHeader>
                        </Headers>

                        {equipment.length ? equipment.map((el, q) => {
                            return  <Item key={q}>
                                        <ItemImage>
                                            <ItemLogo src={imageList[el.type]}/>
                                            <ItemName>{el.type === "Łódka" ? `${el.type} nr ${el.number}` : el.type}</ItemName>
                                        </ItemImage>
                                        <ItemAmount>{el.amount}</ItemAmount>
                                        <ItemHourAmount>{hours}</ItemHourAmount>
                                    </Item>
                        }) : null}

                    </Table>
                    <Separator />
                    <Cost>
                        {paid ? <Prepayment>
                            <CostTitle>Zaliczka</CostTitle>
                            <CostData>{`-${paid} zł`}</CostData>
                        </Prepayment> 
                        : null
                        }
                        
                        <TotalCost>
                            <CostTitle>Do zapłaty</CostTitle>
                            <CostData>{`${cost - paid} zł`}</CostData>
                        </TotalCost>
                    </Cost>
                </ReservationDetails>
            </Wrapper>
        </PageContent>
    );
}
  
export default ReservationSummary;