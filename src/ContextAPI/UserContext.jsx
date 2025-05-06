import React, { useContext, useEffect, useState } from 'react';
import { AuthContext_API } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const UserContext_API = React.createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const { serverURL } = useContext(AuthContext_API);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/employee/get_employee`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(response.data.Employee_Data);
            setUser(response.data.Employee_Data);
        } catch (error) {
            console.log(error);
        }
    };

    const logoutUser = async () => {
        try{
            const response = await axios.get(`${serverURL}/api/auth/user/signout`,{
                headers:{
                    'Content-Type' : 'application/json',
                },
                withCredentials: true,
            })
            console.log(response?.data?.message);
            toast.success(response?.data?.message);
            setUser(null);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        user,
        setUser,
        fetchUser, // fixed: no parentheses
        logoutUser,
    };

    return (
        <UserContext_API.Provider value={value}>
            {children}
        </UserContext_API.Provider>
    );
};

export default UserContext;
