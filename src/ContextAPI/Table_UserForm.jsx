import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext_API } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const Table_UserFormContext = createContext();
const Table_UserForm = ({children}) => {
    const { serverURL } = useContext(AuthContext_API);
    const [employees, setEmployees] = useState([]);
    const [isEditMode,setIsEditMode] = useState(false);
    const [isEditIdMode,setIsEditIdMode] = useState(null);
    const [loadingEmployee,setLoadingEmployee] = useState(false);
   
    const [formEmployee, setFormEmployee] = useState({
        name:"",
        email:"",
        department:"",
        city:"",
        phone:""
    })

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${serverURL}/api/employee/get_employees`,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(response?.data?.All_Employee_Data);
            setEmployees(response?.data?.All_Employee_Data);
            
        }catch(error){
            console.log(error);
        }
    }
    const addEmployee = async () => {
        try{
         setLoadingEmployee(true);
         const response = await axios.post(`${serverURL}/api/employee/add_employee`,formEmployee,{
             headers : {
                 'Content-Type' : 'Application/JSON'
             },
             withCredentials: true
         })
         console.log(response?.data?.message)
         toast.success(response?.data?.message)
         setLoadingEmployee(false);
         setTimeout(() => {
            setMessage("");
        }, 3000);
        await fetchEmployees();
         console.log(response);
        }catch(error){
            toast.error(error?.response?.data?.message)
            setLoadingEmployee(false);
            setTimeout(() => {
                setError("");
            }, 3000);
            console.log(error?.response?.data?.message)
            console.log('addEmployee',error);   
        }
     }

    const values = {
        employees,
        setEmployees,
        fetchEmployees,
        formEmployee,
        setFormEmployee,
        addEmployee,
        isEditMode,
        setIsEditMode,
        setIsEditIdMode,
        isEditIdMode,
        loadingEmployee,
        setLoadingEmployee    
    }
    useEffect(() => {
        fetchEmployees();
    },[])

    
  return (
     <Table_UserFormContext.Provider value={values}>
         {/* <Table_UserFormContext.Provider value={{employees, setEmployees}}> */}
        {children}
     </Table_UserFormContext.Provider>
  )
}

export default Table_UserForm