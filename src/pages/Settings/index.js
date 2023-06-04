import React, { useState } from "react";
import Input from "../../components/Input";
import PageContent from "../../components/PageContent";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fontSizes } from "../../constants/fontSizes";
import { colors } from "../../constants/colors";
import Button from "../../components/Button";
import axios from "axios";

const Wrapper = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 20px;
    align-items: center;
    padding-bottom: 20px;
`
const Header = styled.p`
    font-size: ${fontSizes.l};
    font-weight: 700;
    margin: 30px 0px 10px 0px;
    color: ${colors.primary};
`
const EquipmentHeader = styled.p`
    font-size: ${fontSizes.m};
    font-weight: 500;
    margin: 0px 0px 10px 0px;
`
const EquipmentContainer = styled.div`
    width: 500px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 1000px) {
       width: 50%;
    }

    @media screen and (max-width: 600px) {
       width: 100%;
    }
`
const EquipmentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;

    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`


const Settings = () => {
    const { username } = useAuth();
    const navigate = useNavigate();
    const location = process.env.API_URL || "https://bachotek-app-api.onrender.com";
    const [alertTime, setAlertTime] = useState();   
    const [priceList, setPriceList] = useState({
        hour: {
            kayak: 0,
            boat: 0
        },
        day: {
            kayak: 0,
            boat: 0
        }
    });

    const saveSettings = async () => {
        const newSettings = await axios.put(`${location}/api/settings/6456a1151f1e5855f86784a3`, {
            alertTime,
            priceList: [
                {...priceList}
            ]
        })

        if(newSettings.status === 201) navigate("/");
    }
    
    React.useEffect(() => {
        if(username !== "Admin") navigate("/");
    }, [username, navigate]);

    React.useEffect(() => {
        const req = async () => {
            const settings = await axios.get(`${location}/api/settings`);
            setAlertTime(settings.data[0].alertTime);
            setPriceList({...settings.data[0].priceList[0]}); 
        }

        req();
    }, []);
    return ( 
        <PageContent>
            <Wrapper>
                <Header>Alerty</Header>
                <Input value={alertTime} onChange={(e) => setAlertTime(e.target.value)} type="number" min="1" width="60" name="alertTime" label="Alerty co ile minut?"/>
                <Header>Cennik</Header>
                <EquipmentWrapper>
                    <EquipmentContainer>
                        <EquipmentHeader>Kajak</EquipmentHeader>
                        <Input onChange={(e) => setPriceList({...priceList, hour: {...priceList.hour, kayak: e.target.value}})} value={priceList.hour.kayak} type="number" min="1" width="60" name="kayakHour" label="Cena za godzinę (zł)"/>
                        <Input onChange={(e) => setPriceList({...priceList, day: {...priceList.day, kayak: e.target.value}})} value={priceList.day.kayak} type="number" min="1" width="60" name="kayakDay" label="Cena za cały dzień (zł)"/>
                    </EquipmentContainer>
                    <EquipmentContainer>
                        <EquipmentHeader>Łódka</EquipmentHeader>
                        <Input onChange={(e) => setPriceList({...priceList, hour: {...priceList.hour, boat: e.target.value}})} value={priceList.hour.boat} type="number" min="1" width="60" name="boatHour" label="Cena za godzinę (zł)"/>
                        <Input onChange={(e) => setPriceList({...priceList, day: {...priceList.day, boat: e.target.value}})} value={priceList.day.boat} type="number" min="1" width="60" name="boatDay" label="Cena za cały dzień (zł)"/>
                    </EquipmentContainer>      
                </EquipmentWrapper>
                <Button onClick={saveSettings} text="Zapisz zmiany" bgColor={colors.primary} textColor="white" hoverColor={colors.primaryHover}/>
            </Wrapper>
        </PageContent>
    );
}
 
export default Settings;