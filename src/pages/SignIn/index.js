import PageContent from "../../components/PageContent";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { fontSizes } from "../../constants/fontSizes";
import Input from "../../components/Input";
import { useState } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const User = styled.div`
    cursor: pointer;
    text-align: center;
    min-width: 250px;
    height: 120px;
    background-color: ${props => props.isSelected ? colors.primary : "white"};
    color: ${props => props.isSelected ? "white" : "black"};
    border-radius: 20px;
    font-size: ${fontSizes.l};
    line-height: 120px;
    font-weight: 600;
    margin: 50px 10px;
    transition: all .1s ease-in-out;

    &:hover {
        background-color: ${props => props.isSelected ? colors.primaryHover : colors.secondaryHover};
    }

    
    @media screen and (max-width: 600px) {
        margin: 20px 10px;
    }
`
const UsersWrapper =  styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`
const PasswordWrapper = styled.div`
    width: 100%;
    display: ${props => props.isVisible ? "flex" : "none"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const SignIn = () => {

    const [selectedUser, setSelectedUser] = useState("");
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signIn(selectedUser, password);
            navigate("/");
        } catch (err){
            if(err.message.includes("password")) {
                setIsError(true);
            }
        }
    }

    const handleChange = (e) => {
        setPassword(e.target.value);
    }

    return ( 
        <PageContent>
            <UsersWrapper>
                <User isSelected={selectedUser === "Admin"} onClick={() => setSelectedUser("Admin")}>Admin</User>
                <User isSelected={selectedUser === "Pracownik"} onClick={() => setSelectedUser("Pracownik")}>Pracownik</User>
            </UsersWrapper>
            <PasswordWrapper isVisible={selectedUser}>
                <Form onSubmit={handleSubmit}>
                    <Input type="password" label="Hasło" bgColor={isError ? colors.lightRed : "white"} value={password} onChange={(e) => handleChange(e)}/>
                    <Button type="submit" bgColor={colors.primary} hoverColor={colors.primaryHover} text="Zaloguj się" textColor="white"/>
                </Form>
            </PasswordWrapper>
        </PageContent>
    );
}
 
export default SignIn;