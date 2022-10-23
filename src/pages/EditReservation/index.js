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

const EditReservation = () => {

    const [isDiscount, setIsDiscount] = useState(false);

    return ( 
        <PageContent>
            <Wrapper>
                <Forms>
                    <PersonalData>
                        <Input label="Imię i nazwisko" name="name"/>
                        <Input label="Telefon" name="phone"/>
                        <Input label="PESEL" name="PESEL"/>
                        <Input label="Nr dowodu" name="idNumber"/>
                        <DiscountSelect>
                            <DiscountLabel>Zniżka PTTK?</DiscountLabel>
                            <DiscountOptions>
                                <Yes isSelected={isDiscount} onClick={() => setIsDiscount(true)}>Tak</Yes>
                                <No isSelected={!isDiscount} onClick={() => setIsDiscount(false)}>Nie</No>
                            </DiscountOptions>
                        </DiscountSelect>
                    </PersonalData>
                    <ReservationDetails>
                        <Input type="time" min="09:00" max="19:00" label="Godzina rozpoczęcia" name="startTime"/>
                        <Input type="time" min="09:00" max="19:00" label="Orientacyjna godz. spływu" name="estimatedEndTime"/>
                        <Input type="time" min="09:00" max="19:00" label="Godzina zakończenia" name="estimatedEndTime"/>
                        <Input type="number" label="Zaliczka (zł)" name="prepayment"/>
                        <Input type="text" width="370" label="Uwagi" name="comments"/>
                    </ReservationDetails>
                </Forms>
                <OrderContent>
                    <Header>Co klient wypożycza?</Header>
                    <Products>

                        <ProductWrapper>
                            <ProductImage>
                                <Image src={Kayak}/>
                                <ProductName>Kajak</ProductName>
                            </ProductImage>
                            <ProductMessage>Ile sztuk?</ProductMessage>
                            <ProductOptions>
                                <QuantityControl isClickable={false}>-</QuantityControl>
                                <Quantity>1</Quantity>
                                <QuantityControl isClickable={true}>+</QuantityControl>
                            </ProductOptions>
                        </ProductWrapper>

                        <ProductWrapper>
                            <ProductImage>
                                <Image src={Boat}/>
                                <ProductName>Łódka</ProductName>
                            </ProductImage>
                            <ProductMessage>Wybierz łódki</ProductMessage>
                            <ProductOptions>
                                <BoatId>1</BoatId>
                                <BoatId>2</BoatId>
                                <BoatId>3</BoatId>
                                <BoatId>4</BoatId>
                                <BoatId>5</BoatId>
                                <BoatId>6</BoatId>
                                <BoatId>7</BoatId>
                                <BoatId>8</BoatId>
                                <BoatId>9</BoatId>
                                <BoatId>10</BoatId>
                                <BoatId>11</BoatId>
                                <BoatId>12</BoatId>
                                <BoatId>13</BoatId>
                                <BoatId>14</BoatId>
                                <BoatId>15</BoatId>
                                <BoatId>16</BoatId>
                                <BoatId>17</BoatId>
                                <BoatId>18</BoatId>
                                <BoatId>19</BoatId>
                                <BoatId>20</BoatId>
                            </ProductOptions>
                        </ProductWrapper>

                        <ProductWrapper>
                            <ProductImage>
                                <Image src={Jacket}/>
                                <ProductName>Kapok</ProductName>
                            </ProductImage>
                            <ProductMessage>Ile sztuk?</ProductMessage>
                            <ProductOptions>
                                <QuantityControl isClickable={false}>-</QuantityControl>
                                <Quantity>1</Quantity>
                                <QuantityControl isClickable={true}>+</QuantityControl>
                            </ProductOptions>
                        </ProductWrapper>

                        <ProductWrapper>
                            <ProductImage>
                                <Image src={Oar}/>
                                <ProductName>Wiosło</ProductName>
                            </ProductImage>
                            <ProductMessage>Ile sztuk?</ProductMessage>
                            <ProductOptions>
                                <QuantityControl isClickable={false}>-</QuantityControl>
                                <Quantity>1</Quantity>
                                <QuantityControl isClickable={true}>+</QuantityControl>
                            </ProductOptions>
                        </ProductWrapper>
                    </Products>

                    <CostSummary>
                        Do zapłaty: 
                        <Cost>40 zł</Cost>
                    </CostSummary>
                    <Button text="Zapisz zmiany" bgColor={colors.primary} textColor="white" hoverColor={colors.primaryHover}/>
                </OrderContent>
            </Wrapper>
        </PageContent>
    );
}
 
export default EditReservation;