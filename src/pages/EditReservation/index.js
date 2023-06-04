import React, { useState } from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";


const Wrapper = styled.div`
    background-color: white;
    border-radius: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
    align-items: center;

    @media screen and (max-width: 1300px) {
        flex-direction: column;
    }
`
const Forms = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 1300px) {
        width: 100%;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 50px;
    }

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        align-items: center;
    }
`
const PersonalData = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`
const ReservationDetails = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    @media screen and (max-width: 1300px) {
        margin-top: 0px;
    }

    @media screen and (max-width: 1000px) {
        margin-top: 50px;
    }
`
const DiscountOptions = styled.div`
    display: flex;
    flex-direction: row;
    width: 210px;

    @media screen and (max-width: 700px) {
        width: 170px;
    }

    @media screen and (max-width: 500px) {
        width: 150px;
    }
`
const DiscountSelect = styled.div`
    display: flex;
    flex-direction: row;
`
const DiscountLabel = styled.span`
    font-size: ${fontSizes.s};
    margin-right: 20px;
    font-weight: 500;
    line-height: 30px;

    @media screen and (max-width: 700px) {
        font-size: ${fontSizes.xs};
        margin-right: 15px;
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }
`
const Yes = styled.div`
    cursor: pointer;
    background-color: ${props => props.isSelected ? colors.primary : colors.secondary};
    color: ${props => props.isSelected ? "white" : "black"};
    width: 70px;
    height: 30px;
    border-radius: 20px;
    line-height: 30px;
    text-align: center;
    font-weight: 500;

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
        width: 50px;
    }
`
const No = styled.div`
    cursor: pointer;
    background-color: ${props => props.isSelected ? colors.primary : colors.secondary};
    color: ${props => props.isSelected ? "white" : "black"};
    width: 70px;
    height: 30px;
    border-radius: 20px;
    line-height: 30px;
    text-align: center;
    margin-left: 5px;
    font-weight: 500;

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
        width: 50px;
    }
`
const OrderContent = styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1300px) {
        width: 100%;
    }
`
const Header = styled.header`
    text-align: center;
    font-size: ${fontSizes.m};
    font-weight: 500;
    margin-bottom: 30px;
`
const ProductWrapper = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 20px;
    max-width: 140px;

    @media screen and (max-width: 800px) {
        margin-bottom: 30px;
    }
`
const ProductImage = styled.div`
    background-color: ${colors.primary};
    color: white;
    width: 140px;
    height: 110px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all .2s ease-in-out;

    &:hover {
        background-color: ${colors.primaryHover};
    }
`
const Image = styled.img`
    width: auto;
    height: 55px;
`
const ProductName = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-top: 10px;
`
const ProductMessage = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-top: 10px;
    text-align: center;
    margin-bottom: 10px;
`
const ProductOptions = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const QuantityControl = styled.div`
    cursor: pointer;
    font-weight: 400;
    font-size: ${fontSizes.xm};
    border-radius: 10px;
    text-align: center;
    line-height: 40px;
    width: 40px;
    height: 40px;
    background-color: ${props => props.isClickable ? colors.primary : colors.secondary};
    color: ${props => props.isClickable ? "white" : "black"};
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${props => props.isClickable ? colors.primaryHover : colors.secondaryHover};
    }
`
const Quantity = styled.span`
    display: block;
    text-align: center;
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin: 0px 20px;
    line-height: 40px;
`
const Products = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;

    @media screen and (max-width: 800px) {
        flex-wrap: wrap;
    }
`
const BoatId = styled.div`
    cursor: pointer;
    text-align: center;
    font-weight: 500;
    font-size: ${fontSizes.xs};
    line-height: 25px;
    height: 25px;
    width: 30px;
    background-color: ${colors.primary};
    border-radius: 5px;
    margin: 2px;
    color: white;
`
const CostSummary = styled.p`
    text-align: center;
    font-weight: 500;
    font-size: ${fontSizes.xm};
`
const Cost = styled.span`
    color: ${colors.primary};
    margin-left: 10px;
`
const Select = styled.select`
    background-color: ${colors.secondary};
    border: 0px;
    border-radius: 10px;
    height: 40px;
    width: 210px;
    margin-left: 15px;
    margin-bottom: 10px;
    margin-top: 10px;
    font-size: 16px;
    cursor: pointer;
`
const Option = styled.option`
`
const SelectContainer = styled.div`
    font-size: ${fontSizes.s};
    font-weight: 500;
    line-height: 40px;
`

const EditReservation = () => {
    const navigate = useNavigate();
    const { id: rId } = useParams();
    const [addedAt, setAddedAt] = useState("");
    const [status, setStatus] = useState("");
    const [isDiscount, setIsDiscount] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [pesel, setPesel] = useState("");
    const [id, setId] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [approxTime, setApproxTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");
    const [startDay, setStartDay] = useState();
    const [paid, setPaid] = useState(0);
    const [comments, setComments] = useState("");
    const [clientId, setClientId] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [cost, setCost] = useState(0);
    const [selectedEquipment, setSelectedEquipment] = useState({
        boat: {},
        kayak: 0,
        oar: 0,
        jacket: 0
    });
    const [maxAmount, setMaxAmount] = useState({
        jacket: 0,
        oar: 0,
        kayak: 0,
        boat: 0
    });
   
    const [priceList, setPriceList] = useState({});
    const [costMessage, setCostMessage] = useState("");
    const location = "https://bachotek-app-api.onrender.com";


    React.useEffect(() => {
        const req = async () => {
            const priceReq = await axios.get(`${location}/api/settings`);
            setPriceList({...priceReq.data[0].priceList[0]});
        }

        req();
    }, [])

    const calculatePrice = () => {
        let price = 0;
        let kayakHours = 0;
        let kayakDay = 0;

        const start = startTime?.slice(0, -3);
        const approxEnd = approxTime?.slice(0, -3);
        const hours = approxEnd - start;

        let boatHours = 0;
        let boatDay = 0;

        const eq = [...equipment];
        eq.forEach(el => {
            if(el.type === "Łódka") {
                if(hours * priceList.hour?.boat >= priceList.day?.boat) {
                    boatDay += priceList.day?.boat;
                } else {
                    boatHours += priceList.hour?.boat * hours;
                }
            }
            if(el.type === "Kajak") {
                if(hours * priceList.hour?.kayak >= priceList.day?.kayak) {
                    kayakDay += priceList.day?.kayak * el.amount;
                } else {
                    kayakHours += priceList.hour?.kayak * hours * el.amount;
                }
            }
        });
        price = boatHours + boatDay + kayakHours + kayakDay;
        if(isDiscount)  price = price * 0.9;
        setCost(price);
    }

    React.useEffect(() => {
        calculatePrice();
    }, [name, startTime, approxTime, isDiscount, paid, equipment, priceList])

    React.useEffect(() => {
        const req = async () => {
            const reservation = await axios.get(`${location}/api/reservations/${rId}`);
            const client = await axios.get(`${location}/api/clients/${reservation.data.clientId}`);
            const startDayDate = new Date(reservation.data.startDay).setHours(12);
            const startDayFormatted = new Date(startDayDate).toISOString().slice(0, -14);
            
            setAddedAt(reservation.data.addedAt);
            setClientId(client.data._id);
            setStatus(reservation.data.status);
            setIsDiscount(client.data.isDiscount);
            setName(client.data.name);
            setPhone(client.data.phone);
            setPesel(client.data.pesel);
            setId(client.data.id);
            setStartDay(startDayFormatted);
            setStartTime(reservation.data.startDate);
            setApproxTime(reservation.data.approxDate);
            setEndTime(reservation.data.endDate);
            setPaid(reservation.data.paid);
            setCost(reservation.data.cost);
            setComments(reservation.data.comments)
            setEquipment(reservation.data.equipment);
            
        }

        req();
    }, []);

    const editReservation = async () => {
        const reservation = await axios.put(`${location}/api/reservations/${rId}`, {
            _id: rId,
            status,
            addedAt,
            clientId,
            equipment,
            startDay: `${new Date(startDay).getFullYear()}-${new Date(startDay).getMonth()+1}-${new Date(startDay).getDate()}`,
            startDate: startTime,
            approxDate: approxTime,
            endDate: endTime.length < 3 ? "-" : endTime,
            cost,
            paid,
            comments
        });
        if(reservation.status === 201) navigate("/rezerwacje");
    }
    
    return ( 
        <PageContent>
            <Wrapper>
                <Forms>
                    <PersonalData>
                        <Input readOnly value={name} label="Imię i nazwisko" name="name"/>
                        <Input readOnly value={phone} label="Telefon" name="phone"/>
                        <Input readOnly value={pesel} label="PESEL" name="PESEL"/>
                        <Input readOnly value={id} label="Nr dowodu" name="idNumber"/>
                        <DiscountSelect>
                            <DiscountLabel>Zniżka PTTK?</DiscountLabel>
                            <DiscountOptions>
                                <Yes isSelected={isDiscount}>Tak</Yes>
                                <No isSelected={!isDiscount}>Nie</No>
                            </DiscountOptions>
                        </DiscountSelect>
                    </PersonalData>
                    <ReservationDetails>
                        <SelectContainer>
                            Status
                            <Select onChange={(e) => setStatus(e.target.value)} defaultValue={status}>
                                <Option value="open">W trakcie</Option>
                                <Option value="close">Zakończona</Option>
                                <Option value="planned">Zaplanowana</Option>
                            </Select>
                        </SelectContainer>
                        
                        <Input onChange={(e) => setStartDay(e.target.value)} value={startDay} type="date" label="Dzień rozpoczęcia" name="startDay"/>
                        <Input onChange={(e) => setStartTime(e.target.value)} value={startTime} type="time" min="09:00" max="19:00" label="Godzina rozpoczęcia" name="startTime"/>
                        <Input onChange={(e) => setApproxTime(e.target.value)} value={approxTime} type="time" min="09:00" max="19:00" label="Orientacyjna godz. spływu" name="estimatedEndTime"/>
                        <Input onChange={(e) => setEndTime(e.target.value)} value={endTime === "-" ? "" : endTime} type="time" min="09:00" max="19:00" label="Godzina zakończenia" name="estimatedEndTime"/>
                        <Input onChange={(e) => setPaid(e.target.value)} value={paid} type="number" label="Zaliczka (zł)" name="prepayment"/>
                        <Input onChange={(e) => setComments(e.target.value)} value={comments} type="text" width="370" label="Uwagi" name="comments"/>
                    </ReservationDetails>
                </Forms>
                <OrderContent>
                    <Button onClick={editReservation} text="Zapisz zmiany" bgColor={colors.primary} textColor="white" hoverColor={colors.primaryHover}/>
                </OrderContent>
            </Wrapper>
        </PageContent>
    );
}
 
export default EditReservation;