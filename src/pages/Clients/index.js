import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PageContent from "../../components/PageContent";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import Button from "../../components/Button";
import Input from "../../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Main = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Headers = styled.div`
    width: 70%;
    display: flex;
    text-align: center;
    font-weight: 500;
    font-size: ${fontSizes.xm};
    margin-top: 50px;
`
const Name = styled.span`
    width: 50%;
`
const Phone = styled.span`
    width: 35%;
`
const Client = styled.div`
    width: 70%;
    background-color: white;
    border-radius: 20px;
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0px 20px;
    text-align: center;
    margin: 5px 0px;
    font-size: ${fontSizes.s};
`
const ClientName = styled.span`
    width: 50%;
`
const ClientPhone = styled.span`
    width: 35%;
`


const Clients = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [clients, setClients] = useState([]);
    const location = "https://bachotek-app-api-production.up.railway.app"

    const deleteClient = async (id) => {
        const res = await axios.delete(`${location}/api/clients/${id}`);
        if(res.status === 204) navigate('/klienci');
    }

    React.useEffect(() => {
        const req = async () => {
            const clients = await axios.get(`${location}/api/clients`, { params: { name } });
            setClients([...clients.data]);
        }

        req();
    }, [name])
    return (
        <PageContent>
            <Main>
                <Input label="Szukaj po nazwie" bgColor="white" value={name} onChange={(e) => setName(e.target.value)}></Input>
                <Headers>
                    <Name>Nazwa</Name>
                    <Phone>Nr telefonu</Phone>
                </Headers>
                {clients.map((client, q) => {
                    return  <Client key={q}>
                                <ClientName>{client.name}</ClientName>
                                <ClientPhone>{client.phone}</ClientPhone>
                                <Button 
                                    text="Usuń klienta"
                                    bgColor={colors.lightRed}
                                    hoverColor={colors.lightRedHover}
                                    height="40"
                                    onClick={() => deleteClient(client._id)}
                                />
                            </Client>
                })}
                
            </Main>
            
        </PageContent>
    );
}
 
export default Clients;