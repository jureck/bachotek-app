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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    background-color: white;
    border-radius: 20px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    padding: 40px 20px;

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
    background-color: ${props => props.visible ? colors.primary : colors.fontGray};
    color: white;
    width: 140px;
    height: 110px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all .2s ease-in-out;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    &:hover {
        background-color: ${props => props.visible ? colors.primaryHover : colors.secondaryHover};
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
    display: ${props => props.visible ? 'block' : 'none'};
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-top: 10px;
    text-align: center;
    margin-bottom: 10px;
`
const ProductOptions = styled.div`
    display: ${props => props.visible ? 'flex' : 'none'};
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


    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    &:hover {
        background-color: ${props => props.isClickable ? colors.primaryHover : colors.secondaryHover};
    }
`
const Quantity = styled.span`
    display: block;
    text-align: center;
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin: 0px 15px;
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
    background-color: ${props => props.selected ? colors.primary : colors.secondary};
    border-radius: 5px;
    margin: 2px;
    color: ${props => props.selected ? 'white' : 'black'};
`
const CostSummary = styled.section`
    text-align: center;
    font-weight: 500;
    font-size: ${fontSizes.xm};
`
const Cost = styled.span`
    color: ${colors.primary};
    margin-left: 10px;
`
const ClientName = styled.p`
    border-radius: 20px;
    padding: 10px 20px;
    margin: 5px;
    background-color: ${colors.background};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    
    -moz-user-select: none;  
    -webkit-user-select: none;  
    -ms-user-select: none;  
    -o-user-select: none;  
    user-select: none;

    &:hover {
        
        padding: 10px 30px;
    }
`
const ClearInputs = styled.p`
    background-color: ${colors.primary};
    padding: 10px 20px;
    border-radius: 10px;
    width: 100px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 600;
    color: white;

    &:hover {
        background-color: ${colors.primaryHover};
    }
`
const BlockedTitle = styled.p`
    font-weight: 600;
    font-size: ${fontSizes.xm};
`
const BlockedRes = styled.div`
    width: 600px;
    height: 20px;
    display: flex;
    justify-content: flex-start;
    margin-top: 5px;
    margin-bottom: 5px;
`
const ResDay = styled.span`
    display: block;
`
const ResHours = styled.span`
    display: block;
    margin-left: 10px;
    margin-right: 10px;
`



export const convertToISODate = (date) => {
    const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
    return localISOTime;
}

const NewReservation = () => {
    const navigate = useNavigate();
    const [isDiscount, setIsDiscount] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [pesel, setPesel] = useState("");
    const [id, setId] = useState("");
    const [startTime, setStartTime] = useState(`${new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`);
    const [approxTime, setApproxTime] = useState("23:59");
    const [startDay, setStartDay] = useState(new Date().toISOString().slice(0, -14));
    const [endDay, setEndDay] = useState(new Date().toISOString().slice(0, -14));
    const [paid, setPaid] = useState(0);
    const [comments, setComments] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [nameList, setNameList] = useState([]);
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
        boat: []
    });
    const [blockedEquipment, setBlockedEquipment] = useState({
        jacket: 0,
        oar: 0,
        kayak: 0,
        boat: []
    });
    const [blockingRes, setBlockingRes] = useState([]);
    const [clientData, setClientData] = useState({});
    const [disabledInputs, setDisabledInputs] = useState({name: false, phone: false, pesel: false, id: false, discount: false});
    const [visibleProducts, setVisibleProducts] = useState({kayak: false, boat: false, jacket: false, oar: false});
    const [priceList, setPriceList] = useState({});
    const [costMessage, setCostMessage] = useState("");
    const location = "https://bachotek-app-api.onrender.com";
  

    const getClientByName = async (e) => {
        setName(e.target.value);
        if(e.target.value.length > 2) {
            const req = await axios.get(`${location}/api/clients`, { params: { name: e.target.value } });
            setNameList([...req.data]);
        } else {
            setNameList([]);
            
        }
    }

    const getClient = async (id) => {
        const req = await axios.get(`${location}/api/clients/${id}`);
        setClientData({
            _id: req.data._id,
            name: req.data.name,
            phone: req.data.phone,
            pesel: req.data.pesel,
            id: req.data.id,
            isDiscount: req.data.isDiscount
        });
        setName(req.data.name);
        setPhone(req.data.phone);
        setPesel(req.data.pesel);
        setId(req.data.id);
        setIsDiscount(req.data.isDiscount);
        setDisabledInputs({name: true, phone: true, pesel: true, id: true, discount: true});
        setNameList([]);
    }


    const clearInputs = () => {
        setName("");
        setPhone("");
        setPesel("");
        setId("");
        setIsDiscount("");
        setDisabledInputs({name: false, phone: false, pesel: false, id: false, discount: false});
        setClientData({});
    }

    const toggleEquipment = (type) => {
        let amount = 1;
        if(type === "kayak") {
            amount = maxAmount.kayak - blockedEquipment.kayak;
        }
        if(type === "boat") {
            amount = maxAmount.boat.length - blockedEquipment.boat.length;
        }
        if(type === "oar") {
            amount = maxAmount.oar - blockedEquipment.oar;
        }
        if(type === "jacket") {
            amount = maxAmount.jacket - blockedEquipment.jacket;
        }
        if(amount > 1) {
            if(visibleProducts[type] === true) {
                if(type === "boat") {
                    setSelectedEquipment({...selectedEquipment, boat: {}})
                } else {
                    setSelectedEquipment({...selectedEquipment, [type]: 0});
                }
            } else {
                if(type !== "boat") setSelectedEquipment({...selectedEquipment, [type]: 1});
            }
            setVisibleProducts({...visibleProducts, [type]: !visibleProducts[type]});
        }
    }

    
    
    const addReservation = async () => {
        if(name && phone) {
            let startDayFormatted = `${new Date(startDay).getFullYear()}-${new Date(startDay).getMonth()+1}-${new Date(startDay).getDate()}`;
            const d1 = new Date(startDay),
            d2 = new Date(endDay),
            diff = (d2-d1)/864e5,
            dates = Array.from(
            {length: diff+1},
            (_,i) => {
                const date = new Date() 
                date.setDate(d1.getDate()+i);
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();
                return `${year}-${month+1}-${day}`
            }
            )
            const equipment = [];
            
            for(const key in selectedEquipment.boat) {
                if(selectedEquipment.boat[key] === true) {
                    equipment.push({
                        type: "Łódka",
                        amount: 1,
                        number: Number(key)
                    })
                }
            }
            if(selectedEquipment.kayak) equipment.push({ type: "Kajak", amount: selectedEquipment.kayak});
            if(selectedEquipment.oar) equipment.push({ type: "Wiosło", amount: selectedEquipment.oar});
            if(selectedEquipment.jacket) equipment.push({ type: "Kapok", amount: selectedEquipment.jacket});

            if(!clientData.name) {
                const req = await axios.post(`${location}/api/clients`, { 
                    name: name.toUpperCase(), 
                    phone: phone, 
                    pesel: pesel || "-", 
                    id: id || "-", 
                    isDiscount: isDiscount
                });
    
                const clientId = req.data._id;
                const clientReq = await axios.get(`${location}/api/clients/${clientId}`);
             
                if(dates.length === 1) {
                    const res = await axios.post(`${location}/api/reservations`, { 
                        status: "planned",
                        addedAt: new Date().toISOString(),
                        startDay: startDay,
                        clientId: clientReq.data._id,
                        equipment,
                        startDate: startTime,
                        approxDate: approxTime,
                        endDate: "-",
                        cost,
                        paid,
                        comments
                    });
                    if(res.status === 201) navigate("/rezerwacje");
                } else {
                    dates.map(async (date, i) => {
                        if(i === 0) {
                            const res = await axios.post(`${location}/api/reservations`, { 
                                status: "planned",
                                addedAt: new Date().toISOString(),
                                startDay: date,
                                clientId: clientReq.data._id,
                                equipment,
                                startDate: startTime,
                                approxDate: "19:00",
                                endDate: "-",
                                cost,
                                paid,
                                comments
                            });
                           
                        } else if(i === dates.length - 1) {
                            const res = await axios.post(`${location}/api/reservations`, { 
                                status: "planned",
                                addedAt: new Date().toISOString(),
                                startDay: date,
                                clientId: clientReq.data._id,
                                equipment,
                                startDate: "09:00",
                                approxDate: approxTime,
                                endDate: "-",
                                cost,
                                paid,
                                comments
                            });
                            
                        } else {
                            const res = await axios.post(`${location}/api/reservations`, { 
                                status: "planned",
                                addedAt: new Date().toISOString(),
                                startDay: date,
                                clientId: clientReq.data._id,
                                equipment,
                                startDate: "09:00",
                                approxDate: "19:00",
                                endDate: "-",
                                cost,
                                paid,
                                comments
                            });
                           
                        }  
                    })
                    navigate("/rezerwacje");
                }
            } else {
                if(dates.length === 1) {
                    const res = await axios.post(`${location}/api/reservations`, { 
                        status: "planned",
                        addedAt: new Date().toISOString(),
                        startDay: dates[0],
                        clientId: clientData._id,
                        equipment,
                        startDate: startTime,
                        approxDate: approxTime,
                        endDate: "-",
                        cost,
                        paid,
                        comments
                    });
                    if(res.status === 201) navigate("/rezerwacje");
                } else {
                    dates.map(async (date, i) => {
                        if(i === 0) {
                            await axios.post(`${location}/api/reservations`, { 
                                status: "planned",
                                addedAt: new Date().toISOString(),
                                startDay: date,
                                clientId: clientData._id,
                                equipment,
                                startDate: startTime,
                                approxDate: "19:00",
                                endDate: "-",
                                cost,
                                paid,
                                comments
                            });
                        } else if(i === dates.length - 1) {
                            await axios.post(`${location}/api/reservations`, { 
                                status: "planned",
                                addedAt: new Date().toISOString(),
                                startDay: date,
                                clientId: clientData._id,
                                equipment,
                                startDate: "09:00",
                                approxDate: approxTime,
                                endDate: "-",
                                cost,
                                paid,
                                comments
                            });
                        } else {
                            await axios.post(`${location}/api/reservations`, { 
                                status: "planned",
                                addedAt: new Date().toISOString(),
                                startDay: date,
                                clientId: clientData._id,
                                equipment,
                                startDate: "09:00",
                                approxDate: "19:00",
                                endDate: "-",
                                cost,
                                paid,
                                comments
                            });
                        }  
                    })
                    navigate("/rezerwacje");
                }
            }
        }
    }

    const getStateForDate = async (startDay, endDay, startTime, endTime) => {
        const d1 = new Date(startDay),
        d2 = new Date(endDay),
        diff = (d2-d1)/864e5,
        dates = Array.from(
          {length: diff+1},
          (_,i) => {
            const date = new Date() 
            date.setDate(d1.getDate()+i);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return `${year}-${month+1}-${day}`
          }
        )
        let hoursArray = [];
        for(let j = Number(startTime.slice(0, -3)); j < Number(endTime.slice(0, -3)); j ++) {
            hoursArray.push(j);
        }
        let blocking = [];
        let blockedKayak = 0;
        let blockedOar = 0;
        let blockedJacket = 0;
        let blockedBoat = [];
       
        if(dates.length === 1) {
           
            const res = await axios.get(`${location}/api/reservations`, { params: {
                date: `${dates[0]}`,
                status: "open,planned",
            }});
           
            const blockingReservations = res.data.filter(el => {
                let resHoursArray = [];
                for(let k = Number(el.startDate.slice(0, -3)); k < Number(el.approxDate.slice(0, -3)); k ++) {
                    resHoursArray.push(k);
                }
               
                const filteredArray = hoursArray.filter(value => resHoursArray.includes(value));
                if(filteredArray.length) return true;
                return false;
            });
            blocking.push(...blockingReservations);
            blocking.forEach(res => {
                res.equipment.forEach(eq => {
                    if(eq.type === "Kajak") blockedKayak += eq.amount;
                    if(eq.type === "Wiosło") blockedOar += eq.amount;
                    if(eq.type === "Kapok") blockedJacket += eq.amount;
                    if(eq.type === "Łódka") {
                        blockedBoat.push(eq.number);
                    }
                })
            })
        } else {
            for(let i = 0; i < dates.length; i ++) {
                const res = await axios.get(`${location}/api/reservations`, { params: {
                    date: `${dates[i]}`,
                    status: "open,planned",
                }});
                let hoursArray = [];
                if(i === 0) {
                    for(let j = Number(startTime.slice(0, -3)); j < 19; j ++) {
                        hoursArray.push(j);
                    }
                } else if(i === dates.length - 1) {
                    for(let j = 8; j < Number(endTime.slice(0, -3)); j ++) {
                        hoursArray.push(j);
                    }
                } else {
                    for(let j = 8; j < 20; j ++) {
                        hoursArray.push(j);
                    }
                }
                const blockingReservations = res.data.filter(el => {
                    let resHoursArray = [];
                    for(let k = Number(el.startDate.slice(0, -3)); k < Number(el.approxDate.slice(0, -3)); k ++) {
                        resHoursArray.push(k);
                    }
                    const filteredArray = hoursArray.filter(value => resHoursArray.includes(value));
                    if(filteredArray.length) return true;
                    return false;
                })
                blocking.push(...blockingReservations);
            }
            blocking.forEach(res => {
                res.equipment.forEach(eq => {
                    if(eq.type === "Kajak") blockedKayak += eq.amount;
                    if(eq.type === "Wiosło") blockedOar += eq.amount;
                    if(eq.type === "Kapok") blockedJacket += eq.amount;
                    if(eq.type === "Łódka") {
                        blockedBoat.push(eq.number);
                    }
                })
            })

        }
        
        setBlockingRes([...blocking]);
        setBlockedEquipment({
            jacket: blockedJacket,
            oar: blockedOar,
            kayak: blockedKayak,
            boat: [...blockedBoat]
        });
    }

    React.useEffect(() => {
        const req = async () => {
            let kayak, jacket, oar, boat;
            const kayakReq = await axios.get(`${location}/api/equipment`, { params: { name: "Kajak" } });
            kayak = kayakReq.data[0]?.maxAmount;
            const jacketReq = await axios.get(`${location}/api/equipment`, { params: { name: "Kapok" } });
            jacket = jacketReq.data[0]?.maxAmount;
            const oarReq = await axios.get(`${location}/api/equipment`, { params: { name: "Wiosło" } });
            oar = oarReq.data[0]?.maxAmount;
            const boatReq = await axios.get(`${location}/api/equipment`, { params: { name: "Łódka" } });
            boat = [...boatReq.data];
            boat.sort((a,b) => a.number - b.number); 
            setMaxAmount({kayak, jacket, oar, boat});
            const priceReq = await axios.get(`${location}/api/settings`);
            setPriceList({...priceReq.data[0].priceList[0]});
        }

        req();
    }, [])


    const calculatePrice = () => {
        let price = 0;
        let kayakHours = 0;
        let kayakDay = 0;
        let kayakMessage = ""; 
        let boatMessage = "";

        const start = startTime.slice(0, -3);
        const approxEnd = approxTime.slice(0, -3);
        const hours = approxEnd - start;

        const d1 = new Date(startDay),
        d2 = new Date(endDay),
        diff = (d2-d1)/864e5,
        dates = Array.from(
          {length: diff+1},
          (_,i) => {
            const date = new Date() 
            date.setDate(d1.getDate()+i);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return `${year}-${month+1}-${day}`
          }
        )

        let boatHours = 0;
        let boatDay = 0;
        if(selectedEquipment.kayak) {
            kayakHours = selectedEquipment.kayak * priceList.hour?.kayak * hours;
            kayakDay = selectedEquipment.kayak * priceList.day?.kayak * dates.length;
            if(dates.length > 1) {
                kayakMessage = `Cena za ${selectedEquipment.kayak} x kajak na ${dates.length} dni: ${kayakDay} zł`;
                price += kayakDay;
            } else {
                if(kayakDay <= kayakHours) {
                    kayakMessage = `Cena za ${selectedEquipment.kayak} x kajak do końca dnia: ${kayakDay} zł`;
                    price += kayakDay;
                } else {
                    kayakMessage = `Cena za ${selectedEquipment.kayak} x kajak na ${hours} h: ${kayakHours} zł`;
                    price += kayakHours;
                }
            }
           
            
        }
        if(Object.values(selectedEquipment.boat).some(el => el === true)) {
            let boatNumbers = [];
            Object.keys(selectedEquipment.boat).forEach(key => {
                if(selectedEquipment.boat[key] === true) boatNumbers.push(key);
            });
            boatHours = boatNumbers.length * priceList.hour?.boat * hours;
            boatDay = boatNumbers.length * priceList.day?.boat * dates.length;
            if(dates.length > 1) {
                boatMessage = `Cena za ${boatNumbers.length} x łódka na ${dates.length} dni: ${boatDay} zł`;
                price += boatDay;
            }
            if(boatDay <= boatHours) {
                boatMessage = `Cena za ${boatNumbers.length} x łódka do końca dnia: ${boatDay} zł`;
                price += boatDay;
            } else {
                boatMessage = `Cena za ${boatNumbers.length} x łódka na ${hours} h: ${boatHours} zł`;
                price += boatHours;
            }
        }
        if(isDiscount)  price = price * 0.9;
        setCost(price);
        setCostMessage(<><p>{kayakMessage}</p><p>{boatMessage}</p></>);
    }   


    React.useEffect(() => {
        calculatePrice();
    }, [name, startTime, approxTime, isDiscount, paid, selectedEquipment, priceList])
    
    return ( 
        <PageContent>
            <Wrapper>
                <Forms>
                    <PersonalData>
                        {clientData.name ? <ClearInputs onClick={clearInputs}>Zmień klienta</ClearInputs> : null}
                        
                        <Input label="Imię i nazwisko" name="name" value={name} onChange={(e) => !disabledInputs.name ? getClientByName(e) : null}/>
                        {nameList.map((name, q) => {
                            return <ClientName key={q} onClick={() => getClient(name._id)}>{name.name}</ClientName>
                        })}
                        <Input value={phone} onChange={(e) => !disabledInputs.phone ? setPhone(e.target.value) : null} label="Telefon" name="phone"/>
                        <Input value={pesel} onChange={(e) => !disabledInputs.pesel ? setPesel(e.target.value) : null} label="PESEL" name="PESEL"/>
                        <Input value={id} onChange={(e) => !disabledInputs.id ? setId(e.target.value) : null} label="Nr dowodu" name="idNumber"/>
                        <DiscountSelect>
                            <DiscountLabel>Zniżka PTTK?</DiscountLabel>
                            <DiscountOptions>
                                <Yes isSelected={isDiscount} onClick={() => !disabledInputs.discount ? setIsDiscount(true) : null}>Tak</Yes>
                                <No isSelected={!isDiscount} onClick={() => !disabledInputs.discount ? setIsDiscount(false) : null}>Nie</No>
                            </DiscountOptions>
                        </DiscountSelect>
                    </PersonalData>
                    <ReservationDetails>
                        <Input onChange={(e) => {setStartDay(e.target.value); getStateForDate(e.target.value, endDay, startTime, approxTime)}} value={startDay} type="date" label="Dzień rozpoczęcia" name="startDay"/>
                        <Input onChange={(e) => {setStartTime(e.target.value); getStateForDate(startDay, endDay, e.target.value, approxTime)}} value={startTime} type="time" min="09:00" max="19:00" label="Godz. rozpoczęcia" name="startTime"/>
                        <Input onChange={(e) => {setEndDay(e.target.value); getStateForDate(startDay, e.target.value, startTime, approxTime)}} value={endDay} type="date" label="Dzień zakończenia" name="startDay"/>
                        <Input onChange={(e) => {setApproxTime(e.target.value); getStateForDate(startDay, endDay, startTime, e.target.value)}} value={approxTime} type="time" min="09:00" max="19:00" label="Orientacyjna godz. spływu" name="estimatedEndTime"/>
                        <Input onChange={(e) => setPaid(e.target.value)} value={paid} type="number" label="Zaliczka (zł)" name="prepayment"/>
                        <Input onChange={(e) => setComments(e.target.value)} value={comments} type="text" width="370" label="Uwagi" name="comments"/>
                    </ReservationDetails>
                </Forms>
                <OrderContent>
                    <Header>Co klient wypożycza?</Header>
                    <Products>

                        <ProductWrapper>
                            Dostępne: {maxAmount.kayak - blockedEquipment.kayak}
                            <ProductImage onClick={() => toggleEquipment("kayak")} visible={visibleProducts["kayak"]}>
                                <Image src={Kayak}/>
                                <ProductName>Kajak</ProductName>
                            </ProductImage>
                            <ProductMessage visible={visibleProducts["kayak"]}>Ile sztuk?</ProductMessage>
                            <ProductOptions visible={visibleProducts["kayak"]}>
                                <QuantityControl 
                                    onClick={() => selectedEquipment.kayak > 1 ? setSelectedEquipment({...selectedEquipment, kayak: selectedEquipment["kayak"] - 1}) : null} 
                                    isClickable={selectedEquipment.kayak > 1}>-</QuantityControl>
                                <Quantity>{selectedEquipment.kayak}</Quantity>
                                <QuantityControl 
                                 onClick={() => selectedEquipment.kayak < maxAmount.kayak - blockedEquipment.kayak ? setSelectedEquipment({...selectedEquipment, kayak: selectedEquipment["kayak"] + 1}) : null} 
                                isClickable={selectedEquipment.kayak < maxAmount.kayak - blockedEquipment.kayak}>+</QuantityControl>
                            </ProductOptions>
                        </ProductWrapper>

                        <ProductWrapper>
                            Dostępne: {maxAmount.boat.length - blockedEquipment.boat.length}
                            <ProductImage onClick={() => toggleEquipment("boat")} visible={visibleProducts["boat"]}>
                                <Image src={Boat}/>
                                <ProductName>Łódka</ProductName>
                            </ProductImage>
                            <ProductMessage visible={visibleProducts["boat"]}>Numery łódek</ProductMessage>
                            <ProductOptions visible={visibleProducts["boat"]}>
                                {maxAmount.boat.map((boat, q) => {
                                    return blockedEquipment.boat.includes(String(boat.number)) ? null 
                                    :
                                            <BoatId 
                                                key={boat.number}
                                                selected={selectedEquipment.boat[q+1] === true ? true : false}
                                                onClick={() => setSelectedEquipment({...selectedEquipment, boat: {...selectedEquipment.boat, [q+1]: !selectedEquipment.boat[q+1]}})}
                                            >
                                                {boat.number}
                                            </BoatId>
                                })}
                            </ProductOptions>
                        </ProductWrapper>

                        <ProductWrapper>
                            Dostępne: {maxAmount.jacket - blockedEquipment.jacket}
                            <ProductImage onClick={() => toggleEquipment("jacket")} visible={visibleProducts["jacket"]}>
                                <Image src={Jacket}/>
                                <ProductName>Kapok</ProductName>
                            </ProductImage>
                            <ProductMessage visible={visibleProducts["jacket"]}>Ile sztuk?</ProductMessage>
                            <ProductOptions visible={visibleProducts["jacket"]}>
                                <QuantityControl  
                                onClick={() => selectedEquipment.jacket > 1 ? setSelectedEquipment({...selectedEquipment, jacket: selectedEquipment["jacket"] - 1}) : null} 
                                isClickable={selectedEquipment.jacket > 1}>-</QuantityControl>
                                <Quantity>{selectedEquipment.jacket}</Quantity>
                                <QuantityControl 
                                 onClick={() => selectedEquipment.jacket < maxAmount.jacket ? setSelectedEquipment({...selectedEquipment, jacket: selectedEquipment["jacket"] + 1}) : null} 
                                isClickable={selectedEquipment.jacket < maxAmount.jacket - blockedEquipment.jacket}>+</QuantityControl>
                            </ProductOptions>
                        </ProductWrapper>

                        <ProductWrapper>
                            Dostępne: {maxAmount.oar - blockedEquipment.oar}
                            <ProductImage onClick={() => toggleEquipment("oar")} visible={visibleProducts["oar"]}>
                                <Image src={Oar}/>
                                <ProductName>Wiosło</ProductName>
                            </ProductImage>
                            <ProductMessage visible={visibleProducts["oar"]}>Ile sztuk?</ProductMessage>
                            <ProductOptions visible={visibleProducts["oar"]}>
                                <QuantityControl
                                onClick={() => selectedEquipment.oar > 1 ? setSelectedEquipment({...selectedEquipment, oar: selectedEquipment["oar"] - 1}) : null}  
                                isClickable={selectedEquipment.oar > 1}>-</QuantityControl>
                                <Quantity>{selectedEquipment.oar}</Quantity>
                                <QuantityControl 
                                onClick={() => selectedEquipment.oar < maxAmount.oar ? setSelectedEquipment({...selectedEquipment, oar: selectedEquipment["oar"] + 1}) : null} 
                                isClickable={selectedEquipment.oar < maxAmount.oar - blockedEquipment.oar}>+</QuantityControl>
                            </ProductOptions>
                        </ProductWrapper>
                    </Products>

                    <CostSummary>
                        {costMessage}
                        <Cost>{isDiscount ? "Razem po zniżce: " : "Razem: "}{cost ? cost : 0} zł</Cost>
                    </CostSummary>
                    <Button onClick={addReservation} text="Dodaj rezerwację" bgColor={colors.primary} textColor="white" hoverColor={colors.primaryHover}/>
                  
                    {blockingRes.length > 0 ? <BlockedTitle>Inne rezerwacje w tym terminie</BlockedTitle> : null}
                    {
                        blockingRes.map(res => 
                            <BlockedRes>
                                <ResDay>{res.startDay}</ResDay>
                                <ResHours>{`${res.startDate} - ${res.approxDate}`}</ResHours>
                                {res.equipment.map(el => {
                                    if(el.type === "Łódka") {
                                        return `(${el.type} nr ${el.number})`
                                    } else {
                                        return `(${el.type} x ${el.amount})`
                                    }
                                })}
                            </BlockedRes>
                        )
                    }
                            
                     
                   
                </OrderContent>
            </Wrapper>
        </PageContent>
    );
}
 
export default NewReservation;