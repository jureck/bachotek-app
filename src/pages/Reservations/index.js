import React, { useState } from "react";
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
    margin: 10px 0px 5px 0px;
    text-align: center;

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xs};
    }
`
const Day = styled.div`
    position: sticky;
    top: 0;
    cursor: pointer;
    background-color: white;
    height: 45px;
    border-radius: 20px;
    font-size: ${fontSizes.xm};
    font-weight: 400;
    display: flex;
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
    margin-right: 30px;

    @media screen and (max-width: 1100px) {
        margin-right: 50px;
    }
`
const WeekDay = styled.span`
    color: ${colors.fontGray};
    line-height: 45px;
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
const DayFilter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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
    display: inline;
    color: ${colors.primary};
    font-size: ${fontSizes.xs};
    font-weight: 700;
    margin: 0px 20px;

    &:hover {
        color: ${colors.primaryHover};
    }

    @media screen and (max-width: 500px) {
        font-size: ${fontSizes.xxs};
    }
`
const NextMonth = styled.span`
    cursor: pointer;
    display: inline;
    color: ${colors.primary};
    font-size: ${fontSizes.xs};
    font-weight: 700;
    margin: 0px 20px;

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



const Reservations = () => {

    const reservationStatus = "active";
    const [expandedReservation, setExpandedReservation] = useState(0);
    const [expandedDay, setExpandedDay] = useState(2);
    const [isFilterActive, setIsFilterActive] = useState(false);


    const toggleExpansion = (type, id) => {
        if(type === "reservation") {    
            if(expandedReservation !== id)   setExpandedReservation(id);
        } else {
            if(expandedDay !== id)   setExpandedDay(id);
        }
        
    }

    return ( 
        <PageContent>
            <ListOptions>
                <SortSelect>
                    <SortOption value="newest">od najnowszych</SortOption>
                    <SortOption value="oldest">od najstarszych</SortOption>
                    <SortOption value="byStatus">według statusu</SortOption>
                </SortSelect>
                <FiltersToggle isFilterActive={isFilterActive} onClick={() => setIsFilterActive(!isFilterActive)}>Filtruj</FiltersToggle>
                <MonthPicker>
                    Skocz do miesiąca:
                    <YearSelect>
                        <YearOption>2022</YearOption>
                    </YearSelect>
                    <MonthSelect>
                        <MonthOption>Październik</MonthOption>
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
                        <ToggleToken isSelected={true}>Kajak</ToggleToken>
                        <ToggleToken isSelected={true}>Łódka</ToggleToken>
                        <ToggleToken isSelected={true}>Kapok</ToggleToken>
                        <ToggleToken isSelected={true}>Wiosło</ToggleToken>
                    </InputWrapper>
                </EquipmentsFilter>
                <DayFilter>
                    <FilterTitle>Dni miesiąca</FilterTitle>
                    <Input width="80" type="number" min="1" max="31" value={1} label="od" name="dayFilterFrom"/><br/>
                    <Input width="80" type="number" min="1" max="31" value={31} label="do" name="dayFilterTo"/>
                </DayFilter>
                <TimeFilter>
                    <FilterTitle>Godziny rozpoczęcia</FilterTitle>
                    <Input width="160" type="time" min="09:00" max="19:00" label="od" name="timeFilterFrom" value="09:00"/><br/>
                    <Input width="160" type="time" min="09:00" max="19:00" label="do" name="timeFilterTo" value="19:00"/>
                </TimeFilter>
                <StatusFilter>
                    <FilterTitle>Status</FilterTitle>
                    <InputWrapper>
                        <ToggleToken isSelected={true}>W trakcie</ToggleToken>
                        <ToggleToken isSelected={true}>Zakończona</ToggleToken>
                        <ToggleToken isSelected={true}>Zaplanowana</ToggleToken>
                    </InputWrapper>
                </StatusFilter>
                <PaymentFilter>
                    <FilterTitle>Stan płatności</FilterTitle>
                    <InputWrapper>
                        <ToggleToken isSelected={true}>Zapłacone</ToggleToken>
                        <ToggleToken isSelected={true}>Do zapłacenia</ToggleToken>
                    </InputWrapper>
                </PaymentFilter>
                <NameFilter>
                    <FilterTitle>Dane klienta</FilterTitle>
                    <InputWrapper>
                        <Input type="text" name="nameFilter" label="Imię i nazwisko" />
                    </InputWrapper>
                </NameFilter>
            </FiltersWrapper>
            <ReservationsContainer>
                <Month>
                    <PrevMonth>POPRZEDNI</PrevMonth>
                    Październik 2022
                    <NextMonth>NASTĘPNY</NextMonth>
                </Month>
                <Day onClick={() => toggleExpansion("day", 2)}  isExpanded={expandedDay === 2}>
                    <WeekDay>Niedziela</WeekDay>
                    <DayName>2 października</DayName>
                    <DayArrowWrapper>
                        <Arrow src={expandedDay === 2 ? ArrowUp : ArrowDown} />
                    </DayArrowWrapper>
                </Day>
                {expandedDay === 2 ?
                    <>
                    <Reservation onClick={() => toggleExpansion("reservation", 1)} id={1} isExpanded={expandedReservation === 1} reservationStatus={reservationStatus}>
                    <Name>
                        <CellTitle>Imię i nazwisko</CellTitle>
                        Jacek Isicki
                    </Name>
                    <Equipment>
                        <CellTitle>Typ sprzętu</CellTitle>
                        Łódka nr 2, ...

                    </Equipment>
                    <StartTime>
                        <CellTitle>Godz. rozpoczęcia</CellTitle>
                        10:00
                    </StartTime>
                    <EstimatedEndTime>
                        <CellTitle>Orient. godz. spływu</CellTitle>
                        11:00
                    </EstimatedEndTime>
                    <EndTime>
                        <CellTitle>Godz. zakończenia</CellTitle>
                        -
                    </EndTime>
                    <Status>
                        <CellTitle>Status</CellTitle>
                        W trakcie
                    </Status>
                    <ReservationArrowWrapper>
                        <Arrow src={expandedReservation === 1 ? ArrowUp : ArrowDown}/>
                    </ReservationArrowWrapper>

                    <Phone>
                        <CellTitle>Telefon</CellTitle>
                        123456789
                    </Phone>
                    <PESEL>
                        <CellTitle>PESEL</CellTitle>
                        12312312312
                    </PESEL>
                    <IDNumber>
                        <CellTitle>Nr dowodu</CellTitle>
                        ABC123456
                    </IDNumber>
                    <Paid>
                        <CellTitle>Zapłacone</CellTitle>
                        20 zł (18%)
                    </Paid>
                    <Comments>
                        <CellTitle>Uwagi</CellTitle>
                        Zapłaci w bitcoinie
                    </Comments>

                    <ReservationOptions>
                        <EditLink to="/podsumowanie-rezerwacji/1">
                            <Button 
                                bgColor={colors.primary}
                                textColor="white"
                                hoverColor={colors.primaryHover}
                                text="Zakończ rezerwację"
                            />
                        </EditLink>
                        <EditLink to="/edytuj-rezerwacje/1">
                            <Button 
                                bgColor="#F6C927"
                                textColor="white"
                                hoverColor={colors.yellowHover}
                                text="Edytuj"
                            />
                        </EditLink>
                        <Button 
                            bgColor="#F18686"
                            textColor="white"
                            hoverColor={colors.lightRedHover}
                            text="Usuń"
                        />
                    </ReservationOptions>
                </Reservation>

                <Reservation id={2} onClick={() => toggleExpansion("reservation", 2)} isExpanded={expandedReservation === 2} reservationStatus={reservationStatus}>
                    <Name>
                        <CellTitle>Imię i nazwisko</CellTitle>
                        Jacek Isicki
                    </Name>
                    <Equipment>
                        <CellTitle>Typ sprzętu</CellTitle>
                        Łódka nr 2, ...
                    </Equipment>
                    <StartTime>
                        <CellTitle>Godz. rozpoczęcia</CellTitle>
                        10:00
                    </StartTime>
                    <EstimatedEndTime>
                        <CellTitle>Orient. godz. spływu</CellTitle>
                        11:00
                    </EstimatedEndTime>
                    <EndTime>
                        <CellTitle>Godz. zakończenia</CellTitle>
                        -
                    </EndTime>
                    <Status>
                        <CellTitle>Status</CellTitle>
                        W trakcie
                    </Status>
                    <ReservationArrowWrapper>
                        <Arrow onClick={() => toggleExpansion("reservation", 2)} src={expandedReservation === 2 ? ArrowUp : ArrowDown}/>
                    </ReservationArrowWrapper>

                    <Phone>
                        <CellTitle>Telefon</CellTitle>
                        123456789
                    </Phone>
                    <PESEL>
                        <CellTitle>PESEL</CellTitle>
                        12312312312
                    </PESEL>
                    <IDNumber>
                        <CellTitle>Nr dowodu</CellTitle>
                        ABC123456
                    </IDNumber>
                    <Paid>
                        <CellTitle>Zapłacone</CellTitle>
                        20 zł (18%)
                    </Paid>
                    <Comments>
                        <CellTitle>Uwagi</CellTitle>
                        Zapłaci w bitcoinie
                    </Comments>

                    <ReservationOptions>
                        <Button 
                            bgColor={`${colors.primary}`}
                            textColor="white"
                            text="Zakończ rezerwację"
                        />
                        <Button 
                            bgColor="#F6C927"
                            textColor="white"
                            text="Edytuj"
                        />
                        <Button 
                            bgColor="#F18686"
                            textColor="white"
                            text="Usuń"
                        />
                    </ReservationOptions>
                </Reservation>
                </>
                :

                null}
                
            </ReservationsContainer>
        </PageContent>
    );
}
 
export default Reservations;