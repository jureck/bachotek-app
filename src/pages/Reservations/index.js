import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import Button from "../../components/Button";
import ArrowDown from "../../assets/icons/arrow_down.png";
import ArrowUp from "../../assets/icons/arrow_up.png";
import ToggleToken from "../../components/ToggleToken";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";



const ListOptions = styled.section`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    margin-bottom: 10px;

    @media screen and (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
    }
`
const ReservationsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Month = styled.p`
    font-size: ${fontSizes.xm};
    font-weight: 500;
    margin: 50px 0px 5px 0px;
    text-align: center;
    min-width: 400px;
    display: flex;
    justify-content: space-between;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;


    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xs};
    }
`
const Day = styled.div`
    top: 0;
    cursor: pointer;
    background-color: ${props => props.isSunday || props.isSaturday ? colors.secondaryHover : 'white'};
    height: 45px;
    border-radius: 20px;
    font-size: ${fontSizes.xm};
    font-weight: ${props => props.today ? '900' : '400'};
    display: flex;
    margin-top: 15px;
    padding: 0px 20px;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    @media screen and (max-width: 1100px) {
        width: 95%;
        padding: 0px 15px;
        font-size: ${fontSizes.s};
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xs};
    }
`
const DayName = styled.span`
    display: block;
    line-height: 45px;
    margin-right: 0px;

    @media screen and (max-width: 1100px) {
        margin-right: 0px;
    }
`
const WeekDay = styled.span`
    color: ${colors.fontGray};
    line-height: 45px;
    width: 120px;
`
const ReservationArrowWrapper = styled.div`
    grid-area: 1 / 7 / 2 / 8;
    display: flex;
    justify-content: flex-end;
    margin-right: 5px;
    align-items: center;

    @media screen and (max-width: 1100px) {
        grid-area: 1 / 4 / 2 / 5;
    }

    @media screen and (max-width: 370px) {
        margin-right: 0px;
    }
`
const Arrow = styled.img`
    cursor: pointer;
    height: 40px;

    @media screen and (max-width: 1100px) {
        height: 20px;
    }
`
const Reservation = styled.div`
    cursor: pointer;
    display: grid;
    grid-template-columns: 0.9fr 0.6fr 1fr 1.1fr 1.1fr 0.5fr 0.5fr;
    grid-template-rows: repeat(3, 1fr);
    column-gap: 10px;
    row-gap: 15px;
    background-color: ${props => colors.reservations[props.reservationStatus]};
    font-size: ${fontSizes.s};
    padding: 20px;
    border-radius: 20px;
    margin-top: 10px;
    overflow: hidden;
    height: ${props => props.isExpanded ? "auto" : "50px"};
    width: 100%;

    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;

    @media screen and (max-width: 1300px) {
        font-size: ${fontSizes.xs};
        height: ${props => props.isExpanded ? "auto" : "40px"};
    }

    @media screen and (max-width: 1100px) {
        padding: 10px 15px;
        width: 95%;
        font-size: ${fontSizes.xxs};
        display: grid;
        grid-template-columns: repeat(3, 1fr) 0.1fr;
        grid-template-rows: repeat(4, 1fr) 1.7fr;
        column-gap: 10px;
        row-gap: 15px;
    }

    @media screen and (max-width: 550px) {
        height: ${props => props.isExpanded ? "auto" : "60px"};
    }

    @media screen and (max-width: 500px) {
        grid-template-rows: repeat(4, 1fr) 3fr;
    }
`
const Name = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 1 / 2 / 2;
`
const Equipment = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 2 / 3 / 3;

    @media screen and (max-width: 1100px) {
        grid-area: 2 / 1 / 4 / 2;
    }
`
const StartTime = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 3 / 2 / 4;

    @media screen and (max-width: 1100px) {
        grid-area: 1 / 2 / 2 / 3;
    }
`
const EstimatedEndTime = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 4 / 2 / 5;

    @media screen and (max-width: 1100px) {
        grid-area: 1 / 3 / 2 / 4;
    }
`
const EndTime = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 5 / 2 / 6;

    @media screen and (max-width: 1100px) {
        grid-area: 2 / 2 / 3 / 3;
    }
`
const Status = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 1 / 6 / 2 / 7;

    @media screen and (max-width: 1100px) {
        grid-area: 3 / 2 / 4 / 3;
    }
`
const Phone = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 2 / 1 / 3 / 2;

    @media screen and (max-width: 1100px) {
        grid-area: 4 / 2 / 5 / 3;
    }
`
const PESEL = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 2 / 3 / 3 / 4;

    @media screen and (max-width: 1100px) {
        grid-area: 3 / 3 / 4 / 4;
    }
`
const IDNumber = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 2 / 4 / 3 / 5;

    @media screen and (max-width: 1100px) {
        grid-area: 4 / 1 / 5 / 2;
    }
`
const Paid = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 2 / 5 / 3 / 6;

    @media screen and (max-width: 1100px) {
        grid-area: 2 / 3 / 3 / 4;
    }
`
const Comments = styled.div`
    display: flex;
    flex-direction: column;
    grid-area: 2 / 6 / 3 / 8;

    @media screen and (max-width: 1100px) {
        grid-area: 4 / 3 / 5 / 4;
    }
`
const ReservationOptions = styled.div`
    grid-area: 3 / 1 / 4 / 8;
    display: flex;
    justify-content: center;
    flex-direction: row;

    @media screen and (max-width: 1100px) {
        grid-area: 5 / 1 / 6 / 5;
    }

    @media screen and (max-width: 500px) {
        flex-direction: column;
        align-items: center;
    }
`
const CellTitle = styled.span`
   font-weight: 500;
   font-size: ${fontSizes.xm};
   margin-bottom: 5px;

    @media screen and (max-width: 1300px) {
        font-size: ${fontSizes.s};
    }

    @media screen and (max-width: 1100px) {
        font-size: ${fontSizes.xs};
    }
`
const DayArrowWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5px;
    width: 115px;
`
const FiltersWrapper = styled.div`
    display: ${props => props.isFilterActive ? "flex" : "none"};
    flex-direction: row;
    background-color: white;
    min-height: 160px;
    overflow: hidden;
    border-radius: 20px;
    justify-content: space-between;
    padding: 20px 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`
const EquipmentsFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-basis: 20%;
`
const TimeFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-basis: 20%;
`
const StatusFilter = styled.div`
    flex-basis: 20%;
`
const PaymentFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-basis: 20%;
    
`
const FilterTitle = styled.div`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;
    text-align: center;
`
const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`
const SortSelect = styled.select`
    cursor: pointer;
    border: 0;
    font-weight: 500;
    height: 40px;
    border-radius: 20px;
    font-size: ${fontSizes.xm};
    padding: 5px 20px;
    transition: all .1s ease-in-out;
    background-color: white;

    &:hover {
        background-color: ${colors.whiteOnHover};
    }

    @media screen and (max-width: 1100px) {
        margin-bottom: 10px;
        font-size: ${fontSizes.xs};
        height: 30px;
        padding: 5px 10px;
    }
`
const SortOption = styled.option`
`
const FiltersToggle = styled.div`
    color: ${props => props.isFilterActive ? "white" : "black"};
    cursor: pointer;
    text-align: center;
    width: 80px;
    border: 0;
    font-weight: 500;
    height: 40px;
    border-radius: 20px;
    font-size: ${fontSizes.xm};
    padding: 0px 20px;
    background-color: ${props => props.isFilterActive ? colors.primary : "white"};
    line-height: 40px;
    margin-left: 20px;
    transition: all .1s ease-in-out;

    -moz-user-select: none;  
    -webkit-user-select: none;  
    -ms-user-select: none;  
    -o-user-select: none;  
    user-select: none;

    &:hover {
        background-color: ${props => props.isFilterActive ? colors.primaryHover : colors.whiteOnHover};
    }

    @media screen and (max-width: 1100px) {
        margin-bottom: 10px;
        font-size: ${fontSizes.xs};
        height: 20px;
        padding: 5px 10px;
        line-height: 20px;
    }
`
const AddReservationButton = styled(Link)`
    text-decoration: none;
    color: white;
    background-color: ${colors.primary};
    font-weight: 500;
    height: 40px;
    border-radius: 20px;
    font-size: ${fontSizes.xm};
    padding: 0px 20px;
    line-height: 40px;
    margin-left: 20px;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${colors.primaryHover};
    }

    @media screen and (max-width: 1100px) {
        font-size: ${fontSizes.xs};
        height: 20px;
        padding: 5px 10px;
        line-height: 20px;
    }
`
const PrevMonth = styled.span`
    cursor: pointer;
    color: ${colors.primary};
    font-size: ${fontSizes.xs};
    font-weight: 700;
    margin: 0px 20px;
    line-height: 25px;

    &:hover {
        color: ${colors.primaryHover};
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }
`
const NextMonth = styled.span`
    cursor: pointer;
    color: ${colors.primary};
    font-size: ${fontSizes.xs};
    font-weight: 700;
    margin: 0px 20px;
    line-height: 25px;

    &:hover {
        color: ${colors.primaryHover};
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }
`
const NameFilter = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`
const EditLink = styled(Link)`
`
const MonthPicker = styled.div`
    color: black;
    cursor: pointer;
    text-align: center;
    border: 0;
    font-weight: 500;
    height: 40px;
    border-radius: 20px;
    font-size: ${fontSizes.xm};
    padding: 0px 20px;
    background-color: white;
    line-height: 40px;
    margin-left: 20px;

    @media screen and (max-width: 1100px) {
        margin-bottom: 10px;
        line-height: 20px;
        font-size: ${fontSizes.xs};
        height: 20px;
        padding: 5px 10px;
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }
`
const YearSelect = styled.select`
    color: ${colors.fontGray};
    font-weight: 500;
    margin-left: 5px;
    font-size: ${fontSizes.s};
    cursor: pointer;
    border: 0;
    background-color: white;

    @media screen and (max-width: 1100px) {
        font-size: ${fontSizes.xs};
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }
`
const MonthSelect = styled.select`
    color: ${colors.fontGray};
    font-weight: 500;
    margin-left: 5px;
    font-size: ${fontSizes.s};
    cursor: pointer;
    border: 0;
    background-color: white;
    text-align: center;
    
    @media screen and (max-width: 1100px) {
        font-size: ${fontSizes.xs};
    }

    @media screen and (max-width: 500px) {
        margin-left: 0px;
        font-size: ${fontSizes.xxs};
    }
`
const YearOption = styled.option`
`
const MonthOption = styled.option` 
`
const EquipmentName = styled.p`
    display: block;
    height: 25px;
    margin-top: 0;
`
const FiltersAmount = styled.span`
    color: orange;
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
const ClearFilters = styled.p`
    color: ${colors.fontGray};
    cursor: pointer;

`
const DeleteModal = styled.div`
    display: ${props => props.visible ? "flex" : "none"};
    width: 100%;
    height: 100vh;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const DeleteTitle = styled.p`
    font-size: ${fontSizes.l};
    font-weight: 500;
`
const DeleteButtons = styled.div`
    display: flex;
    flex-direction: row;
`



const Reservations = () => {
    const location = "https://bachotek-app-api.onrender.com";
    const emptyMonth = {1:[],2:[],3:[],4:[],5:[],6:[],7:[],8:[],9:[],10:[],
        11:[],12:[],13:[],14:[],15:[],16:[],17:[],18:[],19:[],20:[],21:[],22:[],23:[],24:[],25:[],26:[],27:[],28:[],29:[],30:[],31:[]};
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()+1);
    const [expandedReservation, setExpandedReservation] = useState(0);
    const [expandedDay, setExpandedDay] = useState(new Date().getDate());
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [reservationsOfDay, setReservationsOfDay] = useState({...emptyMonth});
    const [namesList, setNamesList] = useState([]);
    const [nameSearch, setNameSearch] = useState("");
    const [filtersCount, setFiltersCount] = useState({type: 0, status: 0, time: 0, paid: 0, name: 0});
    const [deleteModal, setDeleteModal] = useState(false);
    const [typeFilters, setTypeFilters] = useState({
        kayak: true,
        boat: true,
        oar: true,
        jacket: true
    });
    const [resToDelete, setResToDelete] = useState();

    const [statusFilters, setStatusFilters] = useState({
        open: true,
        close: true,
        planned: true
    });

    const [timeFilters, setTimeFilters] = useState({
        from: "00:00",
        to: "23:59"
    });

    const [paidFilters, setPaidFilters] = useState({
        paid: true,
        notPaid: true
    });

    const [name, setName] = useState("");
    const [sortType, setSortType] = useState("new");
    
    const reservationStatus = {
        open: "W trakcie",
        close: "Zakończona",
        planned: "Zaplanowana"
    } 
    
    const daysInMonth = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
    }
    
    
    const months = {
        1: "Styczeń",
        2: "Luty",
        3: "Marzec",
        4: "Kwiecień",
        5: "Maj",
        6: "Czerwiec",
        7: "Lipiec",
        8: "Sierpień",
        9: "Wrzesień",
        10: "Październik",
        11: "Listopad",
        12: "Grudzień",
    }
    
    const days = {
        0: "Niedziela",
        1: "Poniedziałek",
        2: "Wtorek",
        3: "Środa",
        4: "Czwartek",
        5: "Piątek",
        6: "Sobota",
    }

    
    const generateArrayOfYears = () => {
        const max = new Date().getFullYear();
        const min = max - 9;
        const years = [];
        
        for (var i = max; i >= min; i--) {
            years.push(i);
        }
        return years
    }
    
    const years = generateArrayOfYears();
    
    const getClient = async (id) => {
        const req = await axios.get(`${location}/api/clients/${id}`);
        return req.data;
    }

    const getReservationsForDay = async (id) => {
        let type = 0;
        let status = 0;
        let time = 0;
        let paid = 0;
        let name = 0;
        if(timeFilters.from !== "00:00" || timeFilters.to !== "23:59") {
            time = 1;
        }
        const trueInFilters = Object.values(typeFilters).reduce((a, type) => a + type, 0);
        if(trueInFilters < 4) type = 1;
        else type = 0;
        const trueInStatus = Object.values(statusFilters).reduce((a, type) => a + type, 0);
        if(trueInStatus < 3) status = 1;
        else status = 0;
        const trueInPaid = Object.values(paidFilters).reduce((a, type) => a + type, 0);
        if(trueInPaid < 2) paid = 1;
        else paid = 0;
        if(nameSearch) name = 1;
        else name = 0;
        setFiltersCount({type, status, time, paid, name});
        setReservationsOfDay({...emptyMonth});
        const req = await axios.get(`${location}/api/reservations`, {
            params: {
                date: `${currentYear}-${currentMonth}-${id}`,
                equipment: `${typeFilters.kayak ? "Kajak" : "" },${typeFilters.boat ? "Łódka" : "" },${typeFilters.oar ? "Wiosło" : "" },${typeFilters.jacket ? "Kapok" : "" }`,
                status: `${statusFilters.open ? "open," : ""}${statusFilters.close ? "close," : ""}${statusFilters.planned ? "planned," : ""}`,
                paid: `${trueInPaid > 1 ? "all" : paidFilters.paid ? "true" : "false"}`,
                client: nameSearch,
                sort: sortType
            }
        })
        const { data } = req;
        let reservations = [];
        if(data.length > 0) {
            data.map(async (reservation, i) => {
                const client = await getClient(reservation.clientId);
                const {name, id: cId, pesel, phone} = client;
                const newReservation = {
                    rId: reservation._id,
                    name: name,
                    equipment: reservation.equipment,
                    startTime: reservation.startDate,
                    approxTime: reservation.approxDate,
                    endTime: reservation.endDate,
                    status: reservation.status,
                    phone: phone,
                    pesel: pesel,
                    id: cId,
                    paid: `${reservation.paid} zł / ${reservation.cost} zł`,
                    comments: reservation.comments,
                };
                if(newReservation.startTime > timeFilters.from && newReservation.startTime < timeFilters.to) {
                    reservations.push(newReservation);
                }
                setReservationsOfDay({...emptyMonth, [id]: [...reservations]});
            });
        } else {
            setReservationsOfDay({...emptyMonth, [id]: []});
        }
    }

    const handleTypeChange = (type) => {
        setTypeFilters({...typeFilters, [type]: !typeFilters[type]});
        setReservationsOfDay({...emptyMonth});
    }

    const handleStatusChange = (type) => {
        setStatusFilters({...statusFilters, [type]: !statusFilters[type]});
        setReservationsOfDay({...emptyMonth});  
    }

    const handleTimeChange = (e, type) => {
        setTimeFilters({...timeFilters, [type]: e.target.value});
        setReservationsOfDay({...emptyMonth});  
    }

    const handlePaidChange = (type) => {
        setPaidFilters({...paidFilters, [type]: !paidFilters[type]});
        setReservationsOfDay({...emptyMonth});  
    }

    const handleNameChange = async (e) => {
        setName(e.target.value);

        if(name.length > 2) {
            const req = await axios.get(`${location}/api/clients`, {
                params: {
                    name: name.toUpperCase()
                }
            })
            setNamesList([...req.data]);
        } else  {
            setNamesList([]);
            setNameSearch("");
        }
    }
   

    const clearFilters = () => {
        setTypeFilters({
            kayak: true,
            boat: true,
            oar: true,
            jacket: true
        });
        setStatusFilters({
            open: true,
            close: true,
            planned: true
        });
        setPaidFilters({
            paid: true,
            notPaid: true
        });
        setTimeFilters({
            from: "00:00",
            to: "23:59"
        });

        setNamesList([]);
        setName("");
    }

    const toggleExpansion = async (type, id) => {
        
        if(type === "reservation") {    
            if(expandedReservation !== id)   setExpandedReservation(id);
            else {
                setExpandedReservation(0);
            }
        } else {
            setReservationsOfDay({...emptyMonth});
            
            if(expandedDay !== id) {
                setExpandedDay(id);
                getReservationsForDay(id);
            } else {
                setExpandedDay(0);
            }
        }
        
    } 
   
    const changeMonth = (direction) => {
        if(direction === "next") {
            if(currentMonth === 12) {
                setCurrentMonth(1);
                setCurrentYear(currentYear + 1);
            } else {
                if(currentYear === new Date().getFullYear() && currentMonth <= new Date().getMonth() + 1) {
                    setCurrentMonth(currentMonth + 1);
                }
            }
        } else {
            if(currentMonth === 1) {
                setCurrentMonth(12);
                setCurrentYear(currentYear - 1);
            } else setCurrentMonth(currentMonth - 1);
        }
    }   

    const deleteReservation = async (id) => {
        setDeleteModal(!deleteModal);
        await axios.delete(`${location}/api/reservations/${id}`);
        getReservationsForDay(expandedDay);
    }
    
    React.useEffect(() => {
        getReservationsForDay(expandedDay);
    }, [typeFilters, statusFilters, timeFilters, paidFilters, currentYear, currentMonth, nameSearch, sortType])
    
    return ( 
        <>
        <PageContent>
            <ListOptions>
                <SortSelect onChange={(e) => setSortType(e.target.value)}>
                    <SortOption value="new">od najnowszych</SortOption>
                    <SortOption value="old">od najstarszych</SortOption>
                    <SortOption value="status">według statusu</SortOption>
                </SortSelect>
                <FiltersToggle isFilterActive={isFilterActive} onClick={() => setIsFilterActive(!isFilterActive)}>Filtruj <FiltersAmount>{Object.values(filtersCount).reduce((a, b) => a + b, 0)}</FiltersAmount></FiltersToggle>
                <MonthPicker>
                    Idź do miesiąca:
                    <YearSelect onChange={(e) => setCurrentYear(e.target.value)} defaultValue={new Date().getFullYear()}>
                        {years.map((year, q) => {
                            return <YearOption
                                        key={q} 
                                        value={year}
                                    >
                                        {year}
                                    </YearOption>
                        })}
                    </YearSelect>
                    <MonthSelect onChange={(e) => setCurrentMonth(e.target.value)} defaultValue={currentMonth}>
                        <MonthOption value={1}>Styczeń</MonthOption>
                        <MonthOption value={2}>Luty</MonthOption>
                        <MonthOption value={3}>Marzec</MonthOption>
                        <MonthOption value={4}>Kwiecień</MonthOption>
                        <MonthOption value={5}>Maj</MonthOption>
                        <MonthOption value={6}>Czerwiec</MonthOption>
                        <MonthOption value={7}>Lipiec</MonthOption>
                        <MonthOption value={8}>Sierpień</MonthOption>
                        <MonthOption value={9}>Wrzesień</MonthOption>
                        <MonthOption value={10}>Październik</MonthOption>
                        <MonthOption value={11}>Listopad</MonthOption>
                        <MonthOption value={12}>Grudzień</MonthOption>
                    </MonthSelect>
                </MonthPicker>
                <AddReservationButton to="/nowa-rezerwacja">
                    Dodaj rezerwację
                </AddReservationButton>
            </ListOptions>
            <FiltersWrapper isFilterActive={isFilterActive}>
                <EquipmentsFilter>
                    <FilterTitle>Rezerwowany sprzęt</FilterTitle>
                    <InputWrapper>
                        <ToggleToken onClick={() => handleTypeChange("kayak")} isSelected={typeFilters.kayak}>Kajak</ToggleToken>
                        <ToggleToken onClick={() => handleTypeChange("boat")} isSelected={typeFilters.boat}>Łódka</ToggleToken>
                        <ToggleToken onClick={() => handleTypeChange("jacket")} isSelected={typeFilters.jacket}>Kapok</ToggleToken>
                        <ToggleToken onClick={() => handleTypeChange("oar")} isSelected={typeFilters.oar}>Wiosło</ToggleToken>
                    </InputWrapper>
                </EquipmentsFilter>
                <TimeFilter>
                    <FilterTitle>Godziny rozpoczęcia</FilterTitle>
                    <Input onChange={(e) => handleTimeChange(e, "from")} width="160" type="time" label="od" name="timeFilterFrom" value={timeFilters.from}/><br/>
                    <Input onChange={(e) => handleTimeChange(e, "to")} width="160" type="time" label="do" name="timeFilterTo" value={timeFilters.to}/>
                </TimeFilter>
                <StatusFilter>
                    <FilterTitle>Status</FilterTitle>
                    <InputWrapper>
                        <ToggleToken onClick={() => handleStatusChange("open")} isSelected={statusFilters.open}>W trakcie</ToggleToken>
                        <ToggleToken onClick={() => handleStatusChange("close")} isSelected={statusFilters.close}>Zakończona</ToggleToken>
                        <ToggleToken onClick={() => handleStatusChange("planned")} isSelected={statusFilters.planned}>Zaplanowana</ToggleToken>
                    </InputWrapper>
                </StatusFilter>
                <PaymentFilter>
                    <FilterTitle>Stan płatności</FilterTitle>
                    <InputWrapper>
                        <ToggleToken onClick={() => handlePaidChange("paid")} isSelected={paidFilters.paid}>Zapłacone</ToggleToken>
                        <ToggleToken onClick={() => handlePaidChange("notPaid")} isSelected={paidFilters.notPaid}>Do zapłacenia</ToggleToken>
                    </InputWrapper>
                </PaymentFilter>
                <NameFilter>
                    <FilterTitle>Dane klienta</FilterTitle>
                    <InputWrapper>
                        <Input onChange={(e) => handleNameChange(e)} type="text" name="nameFilter" label="Imię i nazwisko" value={name}/>
                        
                    </InputWrapper>
                    {namesList.map((name, q) => {
                        return <ClientName key={q} onClick={() => setNameSearch(name._id)}>{name.name}</ClientName>
                    })}
                    {Object.values(filtersCount).some(el => el === 1) ? <ClearFilters onClick={clearFilters}>wyczyść filtry</ClearFilters> : null}
                </NameFilter>
            </FiltersWrapper>
            <ReservationsContainer>
                <Month>
                    <PrevMonth onClick={() => changeMonth("prev")}>POPRZEDNI</PrevMonth>
                    {months[currentMonth]} {currentYear} 
                    <NextMonth onClick={() => changeMonth("next")}>NASTĘPNY</NextMonth>
                </Month>
                
                {
                    [...Array(daysInMonth[currentMonth])].map((e, i) => {
                        return  <>
                                <Day key={i} onClick={() => toggleExpansion("day", i+1)}  
                                        isExpanded={expandedDay === i+1} 
                                        isSaturday={new Date(`${currentYear}-${currentMonth}-${i+1}`).getDay() === 6 ? true : false}
                                        isSunday={new Date(`${currentYear}-${currentMonth}-${i+1}`).getDay() === 0 ? true : false}
                                        today={`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}` === `${currentYear}-${currentMonth}-${i+1}` ? true : false}
                                >
                                    <WeekDay>{days[new Date(`${currentYear}-${currentMonth}-${i+1}`).getDay()]}</WeekDay>
                                    <DayName>{i+1}</DayName> 
                                    <DayArrowWrapper>
                                        <Arrow src={expandedDay === i+1 ? ArrowUp : ArrowDown} />
                                    </DayArrowWrapper>
                                </Day>
                                {reservationsOfDay[i+1]?.map((res, q) => {
                                    return  <Reservation key={q} onClick={() => toggleExpansion("reservation", res.rId)} id={res.rId} isExpanded={expandedReservation === res.rId} reservationStatus={res.status}>
                                            <Name>
                                                <CellTitle>Imię i nazwisko</CellTitle>
                                                {res.name}
                                            </Name>
                                            <Equipment>
                                                <CellTitle>Typ sprzętu</CellTitle>
                                                {res.equipment.map((el, q) => {
                                                    return <EquipmentName key={q}>
                                                                {el.type === "Łódka" ? `${el.type} nr ${el.number}`
                                                                : `${el.amount} x ${el.type}`}
                                                                {res.equipment[1] && q === 0 && expandedReservation !== res.rId ? " . . ." : ""}
                                                            </EquipmentName>
                                                    
                                                })}
                        
                                            </Equipment>
                                            <StartTime>
                                                <CellTitle>Godz. rozpoczęcia</CellTitle>
                                                {res.startTime}
                                            </StartTime>
                                            <EstimatedEndTime>
                                                <CellTitle>Orient. godz. spływu</CellTitle>
                                                {res.approxTime}
                                            </EstimatedEndTime>
                                            <EndTime>
                                                <CellTitle>Godz. zakończenia</CellTitle>
                                                {res.endTime}
                                            </EndTime>
                                            <Status>
                                                <CellTitle>Status</CellTitle>
                                                {reservationStatus[res.status]}
                                            </Status>
                                            <ReservationArrowWrapper>
                                                <Arrow src={expandedReservation === res.rId ? ArrowUp : ArrowDown}/>
                                            </ReservationArrowWrapper>
                        
                                            <Phone>
                                                <CellTitle>Telefon</CellTitle>
                                                {res.phone}
                                            </Phone>
                                            <PESEL>
                                                <CellTitle>PESEL</CellTitle>
                                                {res.pesel}
                                            </PESEL>
                                            <IDNumber>
                                                <CellTitle>Nr dowodu</CellTitle>
                                                {res.id}
                                            </IDNumber>
                                            <Paid>
                                                <CellTitle>Zapłacone</CellTitle>
                                                {res.paid}
                                            </Paid>
                                            <Comments>
                                                <CellTitle>Uwagi</CellTitle>
                                                {res.comments}
                                            </Comments>
                        
                                            <ReservationOptions>
                                                {res.status !== "close" ? 
                                                    <EditLink to={`/podsumowanie-rezerwacji/${res.rId}`}>
                                                        <Button 
                                                            bgColor={colors.primary}
                                                            textColor="white"
                                                            hoverColor={colors.primaryHover}
                                                            text="Zakończ rezerwację"
                                                        />
                                                    </EditLink>
                                                : null}
                                                
                                                <EditLink to={`/edytuj-rezerwacje/${res.rId}`}>
                                                    <Button 
                                                        bgColor="#F6C927"
                                                        textColor="white"
                                                        hoverColor={colors.yellowHover}
                                                        text="Edytuj"
                                                    />
                                                </EditLink>
                                                <Button 
                                                    onClick={() => {setResToDelete(res.rId); setDeleteModal(!deleteModal)}}
                                                    bgColor="#F18686"
                                                    textColor="white"
                                                    hoverColor={colors.lightRedHover}
                                                    text="Usuń"
                                                />
                                            </ReservationOptions>
                                        </Reservation>
                                })}
                                </>
                                
                    })
                }
                
            </ReservationsContainer>
            <DeleteModal visible={deleteModal}>
            <DeleteTitle>Czy na pewno chcesz usunąć rezerwację?</DeleteTitle>
            <DeleteButtons>
                <Button 
                    onClick={() => deleteReservation(resToDelete)}
                    bgColor="#a8a8a8"
                    textColor="black"
                    hoverColor="#919191"
                    text="Tak"
                />
                <Button 
                    onClick={() => setDeleteModal(!deleteModal)}
                    bgColor="#ff806a"
                    textColor="black"
                    hoverColor="#fa492a"
                    text="Nie"
                />
            </DeleteButtons>
        </DeleteModal>
        </PageContent>
       
        </>
    );
}
 
export default Reservations;