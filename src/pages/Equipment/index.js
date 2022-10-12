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

    &:hover {
        background-color: ${colors.whiteOnHover};
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
`
const EquipmentsFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 50px;
    max-width: 220px;
`
const StatusFilter = styled.div`
    max-width: 290px;
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
    justify-content: start;
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
`
const ItemType = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 25%;
`
const ItemTypeTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;
`
const ItemTypeContent = styled.span`
    font-size: ${fontSizes.s};
`
const Number = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
`
const NumberTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;
`
const NumberContent = styled.span`
    font-size: ${fontSizes.s};
`
const Status = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 30%;
`
const StatusTitle = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-bottom: 5px;
`
const StatusContent = styled.span`
    font-size: ${fontSizes.s};
`
const ItemIcon = styled.img`
    height: 65px;
    flex-basis: 6%;
    margin-right: 30px;
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