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

    return ( 
        <PageContent>
            
            <ListOptions>
                <SortSelect>
                    <SortOption value="byStatus">według statusu</SortOption>
                    <SortOption value="byType">według typu</SortOption>
                </SortSelect>
                <FiltersToggle isFilterActive={isFilterActive} onClick={() => setIsFilterActive(!isFilterActive)}>Filtruj</FiltersToggle>
                <EditEquipmentButton to="/edytuj-sprzet">
                    Edytuj stan sprzętu
                </EditEquipmentButton>
            </ListOptions>
            <FiltersWrapper isFilterActive={isFilterActive}>
                <EquipmentsFilter>
                    <FilterTitle>Typ sprzętu</FilterTitle>
                    <InputWrapper>
                        <ToggleToken isSelected={true}>Kajak</ToggleToken>
                        <ToggleToken isSelected={true}>Łódka</ToggleToken>
                        <ToggleToken isSelected={true}>Kapok</ToggleToken>
                        <ToggleToken isSelected={true}>Wiosło</ToggleToken>
                    </InputWrapper>
                </EquipmentsFilter>
                <StatusFilter>
                    <FilterTitle>Status</FilterTitle>
                    <InputWrapper>
                        <ToggleToken isSelected={true}>Dostępny</ToggleToken>
                        <ToggleToken isSelected={true}>Zajęty</ToggleToken>
                        <ToggleToken isSelected={true}>Zaplanowany</ToggleToken>
                    </InputWrapper>
                </StatusFilter>
            </FiltersWrapper>

            <EquipmentList>

                <Item status="available">
                    <ItemIcon src={Boat} />
                    <ItemType>
                        <ItemTypeTitle>Typ</ItemTypeTitle>
                        <ItemTypeContent>Łódka</ItemTypeContent>
                    </ItemType>
                    <Number>
                        <NumberTitle>Numer</NumberTitle>
                        <NumberContent>1</NumberContent>
                    </Number>
                    <Status>
                        <StatusTitle>Status</StatusTitle>
                        <StatusContent>Dostępny</StatusContent>
                    </Status>
                </Item>

                <Item status="available">
                    <ItemIcon src={Kayak} />
                    <ItemType>
                        <ItemTypeTitle>Typ</ItemTypeTitle>
                        <ItemTypeContent>Kajak</ItemTypeContent>
                    </ItemType>
                    <Number>
                        <NumberTitle></NumberTitle>
                        <NumberContent></NumberContent>
                    </Number>
                    <Status>
                        <StatusTitle>Dostępna ilość</StatusTitle>
                        <StatusContent>4 / 10</StatusContent>
                    </Status>
                </Item>

            </EquipmentList>
            
        </PageContent>
    );
}
 
export default Equipment;