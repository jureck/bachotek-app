import React, { useState } from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import { Link } from "react-router-dom";
import ToggleToken from "../../components/ToggleToken";
import Kayak from "../../assets/icons/kayak_black.png";
import Oar from "../../assets/icons/oar_black.png";
import Jacket from "../../assets/icons/jacket_black.png";
import Boat from "../../assets/icons/boat_black.png";
import Button from "../../components/Button";
import axios from "axios";


const ListOptions = styled.section`
    display: flex;
    flex-direction: row;
    margin-top: 30px;
    margin-bottom: 20px;

    @media screen and (max-width: 600px) {
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 10px;
    }
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
    text-align: center;

    &:hover {
        background-color: ${colors.whiteOnHover};
    }

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.s};
        padding: 3px 10px;
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

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.s};
        padding: 0px 5px;
    }
`
const EditEquipmentButton = styled(Link)`
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

    @media screen and (max-width: 600px) {
        margin-top: 10px;
    }

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.s};
        padding: 0px 10px;
    }
`
const FiltersWrapper = styled.div`
    display: ${props => props.isFilterActive ? "flex" : "none"};
    flex-direction: row;
    background-color: white;
    min-height: 140px;
    overflow: hidden;
    border-radius: 20px;
    justify-content: center;
    padding: 20px 40px;
    margin-top: 20px;
    margin-bottom: 20px;

    @media screen and (max-width: 400px) {
        flex-direction: column;
        align-items: center;
    }
`
const EquipmentsFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 50px;
    max-width: 220px;

    @media screen and (max-width: 400px) {
        align-items: center;
        margin-right: 0px;
    }
`
const StatusFilter = styled.div`
    max-width: 290px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 400px) {
        margin-top: 20px;
        align-items: center;
    }
`
const FilterTitle = styled.div`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;
    text-align: center;

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.s};
    }
`
const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;

    @media screen and (max-width: 400px) {
        justify-content: center;
    }
`
const EquipmentList = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    align-items: center;
`
const Item = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 40px;
    border-radius: 20px;
    width: 50%;
    height: 60px;
    margin-bottom: 10px;
    background-color: ${props => colors.equipment[props.status]};

    @media screen and (max-width: 1000px) {
        width: 80%;
    }

    @media screen and (max-width: 800px) {
        width: 90%;
    }

    @media screen and (max-width: 600px) {
        flex-wrap: wrap;
        height: 120px;
        padding: 10px 0px;
    }
`
const ItemType = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 25%;

    @media screen and (max-width: 600px) {
        flex-basis: 35%;
    }

    @media screen and (max-width: 450px) {
        flex-basis: 45%;
    }
`
const ItemTypeTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;

    @media screen and (max-width: 600px) {
        font-size: ${fontSizes.s};
    }
`
const ItemTypeContent = styled.span`
    font-size: ${fontSizes.s};
`
const Number = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;

    @media screen and (max-width: 600px) {
        flex-basis: 35%;
        margin-left: 70px;
    }

    @media screen and (max-width: 450px) {
        margin-left: 50px;
    }
`
const NumberTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;

    @media screen and (max-width: 600px) {
        font-size: ${fontSizes.s};
    }
`
const NumberContent = styled.span`
    font-size: ${fontSizes.s};
`
const Status = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;

    @media screen and (max-width: 600px) {
        flex-basis: 35%;
    }

    @media screen and (max-width: 450px) {
        flex-basis: 45%;
    }
`
const StatusTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;

    @media screen and (max-width: 600px) {
        font-size: ${fontSizes.s};
    }
`
const StatusContent = styled.span`
    font-size: ${fontSizes.s};
`
const ItemIcon = styled.img`
    height: 65px;
    flex-basis: 6%;
    margin-right: 30px;

    @media screen and (max-width: 600px) {
        margin-left: 70px;
        margin-right: 40px;
    }

    @media screen and (max-width: 450px) {
        margin-left: 50px;
    }
`

const Equipment = () => {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const location = process.env.API_URL || "http://127.0.0.1:3000";

    const [typeFilters, setTypeFilters] = useState({
        kayak: true,
        boat: true,
        oar: true,
        jacket: true
    });
    const [statusFilters, setStatusFilters] = useState({
        available: true,
        notAvailable: true
    });
    const [equipment, setEquipment] = useState([]);
    const [sortType, setSortType] = useState("type");

    const handleTypeChange = (type) => {
        setTypeFilters({...typeFilters, [type]: !typeFilters[type]});
    }

    const handleStatusChange = (type) => {
        setStatusFilters({...statusFilters, [type]: !statusFilters[type]});
    }

    const imageName = {
        Kajak: Kayak,
        Łódka: Boat,
        Wiosło: Oar,
        Kapok: Jacket
    }

    const getEquipment = async () => {
        const req = await axios.get(`${location}/api/equipment`, {
            params: {
                name: `${typeFilters.kayak ? "Kajak" : "" },${typeFilters.boat ? "Łódka" : "" },${typeFilters.oar ? "Wiosło" : "" },${typeFilters.jacket ? "Kapok" : "" }`,
                status: `${statusFilters.available ? "available," : ""}${statusFilters.notAvailable ? "notAvailable," : ""}`,
                sort: sortType
            }
        });
        const { data } = req;
        let tempEq = [];
        if(data.length > 0) {
            data.map(async (eq, i) => {
                const newEquipment = {
                    type: eq.name,
                    amount: eq.amount,
                    number: eq.number,
                    status: eq.status
                };
                tempEq.push(newEquipment);
                
            });
        } else {
            setEquipment([]);
        }
        setEquipment([...tempEq]);
    }

    React.useEffect(() => {
        getEquipment();
    }, [typeFilters, statusFilters, sortType])
    
    return ( 
        <PageContent>
            
            <ListOptions>
                <SortSelect onChange={(e) => setSortType(e.target.value)} defaultValue="type">
                    <SortOption value="status">według statusu</SortOption>
                    <SortOption value="type">według typu</SortOption>
                </SortSelect>
                <FiltersToggle isFilterActive={isFilterActive} onClick={() => setIsFilterActive(!isFilterActive)}>Filtruj</FiltersToggle>
            </ListOptions>
            <FiltersWrapper isFilterActive={isFilterActive}>
                <EquipmentsFilter>
                    <FilterTitle>Typ sprzętu</FilterTitle>
                    <InputWrapper>
                        <ToggleToken onClick={() => handleTypeChange("kayak")} isSelected={typeFilters.kayak}>Kajak</ToggleToken>
                        <ToggleToken onClick={() => handleTypeChange("boat")} isSelected={typeFilters.boat}>Łódka</ToggleToken>
                        <ToggleToken onClick={() => handleTypeChange("jacket")} isSelected={typeFilters.jacket}>Kapok</ToggleToken>
                        <ToggleToken onClick={() => handleTypeChange("oar")} isSelected={typeFilters.oar}>Wiosło</ToggleToken>
                    </InputWrapper>
                </EquipmentsFilter>
                <StatusFilter>
                    <FilterTitle>Status</FilterTitle>
                    <InputWrapper>
                        <ToggleToken onClick={() => handleStatusChange("available")} isSelected={statusFilters.available}>Dostępny</ToggleToken>
                        <ToggleToken onClick={() => handleStatusChange("notAvailable")} isSelected={statusFilters.notAvailable}>Zajęty</ToggleToken>
                    </InputWrapper>
                </StatusFilter>
            </FiltersWrapper>

            <EquipmentList>
                {equipment.map((eq, q) => {
                    return  <Item key={q} status={eq.amount > 0 ? "available" : "occupied"}>
                                <ItemIcon src={imageName[eq.type]} />
                                <ItemType>
                                    <ItemTypeTitle>Typ</ItemTypeTitle>
                                    <ItemTypeContent>{eq.type}</ItemTypeContent>
                                </ItemType>
                                <Number>
                                    <NumberTitle>{eq.type === "Łódka" ? "Numer" : ""}</NumberTitle>
                                    <NumberContent>{eq.type === "Łódka" ? eq.number : ""}</NumberContent>
                                </Number>
                                <Status>
                                    <StatusTitle>{eq.type === "Łódka" ? "Status" : "Dostępne"}</StatusTitle>
                                    <StatusContent>{eq.type === "Łódka" ? eq.amount > 0 ? "Dostępna" : "Zajęta" : eq.amount}</StatusContent>
                                </Status>
                            </Item>
                })}
            </EquipmentList>
            
        </PageContent>
    );
}
 
export default Equipment;