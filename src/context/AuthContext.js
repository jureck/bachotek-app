import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../services/auth/config";
import { useNavigate } from 'react-router-dom';

export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState("");

    const uidList = {
        LmmnBy0ar5OijhGnsQI1gGGaPo43: "Admin",
        Yu4DxawT2rRbtElTyI78spu4wIC3: "Pracownik",
    };

    const usersList = {
        Admin: "serwispttkbachotek@gmail.com",
        Pracownik: "pracownik@bachotek.app",
    }

    const signIn = (user, password) => {
        return signInWithEmailAndPassword(auth, usersList[user], password);
    }

    const userSignOut = () => {
        return signOut(auth);
    }


    useEffect(() => {
        const cleanup = auth.onAuthStateChanged((user) => {
            if(user) {
                setUsername(uidList[user.uid]);
            }
            else {
                setUsername("");
            }
        })
        return cleanup;
    }, []);
    
    const value = {
        username,
        signIn,
        userSignOut,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}