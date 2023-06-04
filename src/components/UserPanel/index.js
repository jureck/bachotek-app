import styled from "styled-components";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import AlertIcon from "../../assets/icons/alert.png";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import PTTK from "../../assets/icons/logo.png";
import React, { useState } from 'react';
import axios from "axios";

const Panel = styled.div`
    width: 90%;
    height: 105px;
    margin: auto 60px;
    padding: 30px 0px 40px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        margin: auto auto 120px auto;
    }

    @media screen and (max-width: 600px) {
        flex-direction: column;
        margin: auto auto 60px auto;
    }
`
const LoggedAs = styled.p`
    margin: 0;
    padding: 0;
    font-size: ${fontSizes.l};
    font-weight: 600;
    @media screen and (max-width: 600px) {
        font-size: ${fontSizes.m};
    }
    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xm};
    }
`
const Username = styled.span`
    margin-left: 10px;
    color: ${colors.primary};
    font-size: ${fontSizes.l};
    font-weight: 600;
    @media screen and (max-width: 600px) {
        font-size: ${fontSizes.m};
    }
    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xm};
    }
`
const Controls = styled.div`
    display: flex;
    flex-direction: row;
    @media screen and (max-width: 1000px) {
        margin-top: 20px;
    }
`
const SignToggle = styled.div`
    text-align: center;
    text-decoration: none;
    line-height: 35px;
    cursor: pointer;
    display: block;
    border: 0;
    background-color: white;
    color: black;
    font-weight: 500;
    height: 35px;
    width: 140px;
    font-size: ${fontSizes.s};
    border-radius: 10px;
    margin-left: 60px;
    padding: 0;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${colors.whiteOnHover};
    }

    @media screen and (max-width: 1000px) {
        margin-left: 0px;
    }

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xs};
    }
`
const SignInToggle = styled(Link)`
    text-align: center;
    text-decoration: none;
    line-height: 35px;
    cursor: pointer;
    display: block;
    border: 0;
    background-color: white;
    color: black;
    font-weight: 500;
    height: 35px;
    width: 140px;
    font-size: ${fontSizes.s};
    border-radius: 10px;
    margin-left: 60px;
    padding: 0;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${colors.whiteOnHover};
    }

    @media screen and (max-width: 1000px) {
        margin-left: 0px;
    }

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xs};
    }
`
const Alerts = styled(Link)`
    color: black;
    text-decoration: none;
    cursor: pointer;
    height: 35px;
    width: 80px;
    margin-left: 20px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.alertsamount ? '#FFA3A3' : 'white'};
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${props => props.alertsamount ? colors.lightRed : 'white' };
    }
`
const AlertsIcon = styled.img`
    width: 20px;
    height: 20px;
`
const AlertsAmount = styled.span`
    font-weight: 600;
    margin: 0px 0px 0px 8px;
    font-size: ${fontSizes.s};

    @media screen and (max-width: 400px) {
        font-size: ${fontSizes.xs};
    }
`
const Logo = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 30px;
    @media screen and (max-width: 1000px) {
        margin-right: 0px;
    }
`
const LogoImage = styled.img`
    height: 80px;
    @media screen and (max-width: 600px) {
        height: 60px;
    }
`
const AppName = styled.span`
    margin-top: 5px;
    font-size: ${fontSizes.s};
    font-weight: 600;
    color: ${colors.fontGray};
    letter-spacing: 1px;

    @media screen and (max-width: 600px) {
        font-size: ${fontSizes.xs};
        margin-bottom: 5px;
    }
`


const UserPanel = ({ alertsAmount }) => {

    const { username, userSignOut } = useAuth();
    const navigate = useNavigate();
    
    const handleSignout = async () => {
        navigate("/");
        try {
            userSignOut();
            
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
        { username ?
                <Panel>
                    <Logo onClick={() => navigate("/")}>
                        <LogoImage src={PTTK} />
                        <AppName>System Rezerwacji</AppName>
                    </Logo>
                    <LoggedAs>
                        Zalogowany jako
                        <Username>{username}</Username>
                    </LoggedAs>
                    <Controls>
                        <SignToggle onClick={handleSignout}>Wyloguj się</SignToggle>
                        <Alerts to="/alerty" alertsamount={alertsAmount}>
                            <AlertsIcon src={AlertIcon} />
                            <AlertsAmount>{alertsAmount}</AlertsAmount>
                        </Alerts>
                    </Controls>
                </Panel>
            :
                <Panel>
                    <Logo>
                        <LogoImage src={PTTK} />
                        <AppName>System Rezerwacji</AppName>
                    </Logo>
                    <LoggedAs>
                        Jesteś
                        <Username>niezalogowany</Username>
                    </LoggedAs>
                    <Controls>
                        <SignInToggle to="/zaloguj-sie">Zaloguj się</SignInToggle>
                    </Controls>
                </Panel>
        }
        </>
    );
}

export default UserPanel;