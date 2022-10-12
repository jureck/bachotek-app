import React from "react";
import Input from "../../components/Input";
import PageContent from "../../components/PageContent";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fontSizes } from "../../constants/fontSizes";
import { colors } from "../../constants/colors";
import Button from "../../components/Button";

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
`
const EquipmentWrapper = styled.div`
    width: 1000px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`


const Settings = () => {
    const { username } = useAuth();
    const navigate = useNavigate();
    
    React.useEffect(() => {
        if(username !== "Admin") navigate("/");
    }, []);

    return ( 
        <PageContent>
            <Wrapper>
                <Header>Alerty</Header>
                <Input type="number" min="1" width="60" name="alertTime" label="Ile minut po przekroczeniu czasu wyskoczy alert?"/>
                <Header>Cennik</Header>
                <EquipmentWrapper>
                    <EquipmentContainer>
                        <EquipmentHeader>Kajak</EquipmentHeader>
                        <Input type="number" min="1" width="60" name="kayakHour" label="Cena za godzinę (zł)"/>
                        <Input type="number" min="1" width="60" name="kayakDay" label="Cena za cały dzień (zł)"/>
                    </EquipmentContainer>
                    <EquipmentContainer>
                        <EquipmentHeader>Łódka</EquipmentHeader>
                        <Input type="number" min="1" width="60" name="boatHour" label="Cena za godzinę (zł)"/>
                        <Input type="number" min="1" width="60" name="boatDay" label="Cena za cały dzień (zł)"/>
                    </EquipmentContainer>      
                </EquipmentWrapper>
                <Button text="Zapisz zmiany" bgColor={colors.primary} textColor="white" hoverColor={colors.primaryHover}/>
            </Wrapper>
        </PageContent>
    );
}
 
export default Settings;