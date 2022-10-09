import React, { useState } from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import Kayak from "../../assets/icons/kayak.png";
import Oar from "../../assets/icons/oar.png";
import Jacket from "../../assets/icons/jacket.png";
import Boat from "../../assets/icons/boat.png";
import Button from "../../components/Button";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    margin-top: 40px;
    padding-bottom: 50px;
`
const Header = styled.p`
    font-size: ${fontSizes.m};
    font-weight: 500;
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
const EquipmentContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 150px;
`
const Equipment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
`
const State = styled.span`
    margin-bottom: 5px;
    font-size: ${fontSizes.xs};
`
const Image = styled.div`
    cursor: pointer;
    background-color: ${colors.primary};
    color: white;
    width: 180px;
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
const NewStateHeader = styled.p`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin: 20px;
`
const NewStateWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const EquipmentLogo = styled.img`
    width: auto;
    height: 55px;
`
const EquipmentName = styled.span`
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-top: 10px;
`

const EditEquipment = () => {
    return ( 
        <PageContent>
            <Wrapper>
                <Header>Co chcesz zmienić?</Header>
                <EquipmentContainer>

                    <Equipment>
                        <State>Obecny stan: 3</State>
                        <Image>
                            <EquipmentLogo src={Kayak}/>
                            <EquipmentName>Kajak</EquipmentName>
                        </Image>
                        <NewStateHeader>Nowa ilość</NewStateHeader>
                        <NewStateWrapper>
                            <QuantityControl isClickable={false}>-</QuantityControl>
                            <Quantity>3</Quantity>
                            <QuantityControl isClickable={true}>+</QuantityControl>
                        </NewStateWrapper>
                    </Equipment>

                    <Equipment>
                        <State>Obecny stan: 3</State>
                        <Image>
                            <EquipmentLogo src={Kayak}/>
                            <EquipmentName>Kajak</EquipmentName>
                        </Image>
                        <NewStateHeader>Nowa ilość</NewStateHeader>
                        <NewStateWrapper>
                            <QuantityControl isClickable={false}>-</QuantityControl>
                            <Quantity>3</Quantity>
                            <QuantityControl isClickable={true}>+</QuantityControl>
                        </NewStateWrapper>
                    </Equipment>

                    <Equipment>
                        <State>Obecny stan: 3</State>
                        <Image>
                            <EquipmentLogo src={Kayak}/>
                            <EquipmentName>Kajak</EquipmentName>
                        </Image>
                        <NewStateHeader>Nowa ilość</NewStateHeader>
                        <NewStateWrapper>
                            <QuantityControl isClickable={false}>-</QuantityControl>
                            <Quantity>3</Quantity>
                            <QuantityControl isClickable={true}>+</QuantityControl>
                        </NewStateWrapper>
                    </Equipment>

                    <Equipment>
                        <State>Obecny stan: 3</State>
                        <Image>
                            <EquipmentLogo src={Kayak}/>
                            <EquipmentName>Kajak</EquipmentName>
                        </Image>
                        <NewStateHeader>Nowa ilość</NewStateHeader>
                        <NewStateWrapper>
                            <QuantityControl isClickable={false}>-</QuantityControl>
                            <Quantity>3</Quantity>
                            <QuantityControl isClickable={true}>+</QuantityControl>
                        </NewStateWrapper>
                    </Equipment>

                </EquipmentContainer>

                <Button bgColor={colors.primary} textColor="white" hoverColor={colors.primaryHover} text="Zapisz zmiany"/>
            </Wrapper>
        </PageContent>
    );
}
 
export default EditEquipment;