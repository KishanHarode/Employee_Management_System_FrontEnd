import React, { useContext, useState } from 'react'
import { Table_UserFormContext } from '../ContextAPI/Table_UserForm';
import { AuthContext_API } from '../ContextAPI/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import LoadingSpinner from './LoadingSpinner';
import { GrUpdate } from "react-icons/gr";
import { RiDeleteBinLine } from "react-icons/ri";
import SearchBar from './SearchBar';

const Table_Form = () => {
    const { formEmployee, fetchEmployees, setFormEmployee, addEmployee, isEditMode,
        setIsEditMode,setIsEditIdMode,isEditIdMode, setLoadingEmployee,  loadingEmployee, filterData } = useContext(Table_UserFormContext);
    const { serverURL } = useContext(AuthContext_API);
    
   
    const handleDelete = async (id) => {
        try {
            const delete_result = await Swal.fire({
                title: "Are You Sure ?",
                text: "This action will delete the employee data!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, delete it..!',
            })
            if (delete_result.isConfirmed) {
                const response = await axios.delete(`${serverURL}/api/employee/delete_employee/${id}`, {
                    headers: {
                        'Content-Type': 'Application/JSON',
                    },
                    withCredentials: true
                })
                toast.success(response?.data?.message);
                await fetchEmployees();
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleUpdate = async (id) => {
        try {
            const update_result = await Swal.fire({
                title: 'Update Employee?',
                text: "Do you want to Update this employee's details?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#aaa',
                confirmButtonText: 'Yes, Update it!'
            });
            if (update_result.isConfirmed) {
                const response = await axios.get(`${serverURL}/api/employee/get_employee/${id}`, {
                    headers: {
                        'Content-Type': 'Application/Json'
                    },
                    withCredentials: true
                })
                console.log(response);
                const {Employee_1,message} = response.data;
                setFormEmployee({
                    name:Employee_1.name,
                    email:Employee_1.email,
                    department:Employee_1.department,
                    city:Employee_1.city,
                    phone:Employee_1.phone
                })
                toast.info(message);
                setIsEditMode(true);
                setIsEditIdMode(id);
                // console.log(Employee_1,message)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const form_field_data = [
        {
            id: 1,
            text: "Name",
            name: "name",
            message: "Enter Your Name...",
            value: formEmployee.name,
        },
        {
            id: 2,
            text: "Email",
            name: "email",
            message: "Enter Your Email...",
            value: formEmployee.email,
        },
        {
            id: 3,
            text: "Department",
            name: "department",
            message: "Enter Your Department...",
            value: formEmployee.department,
        },
        {
            id: 4,
            text: "City",
            name: "city",
            message: "Enter Your City...",
            value: formEmployee.city,
        },
        {
            id: 5,
            text: "Phone",
            name: "phone",
            message: "Enter Your Phone",
            value: formEmployee.phone,
        }
    ]
    const handleData = (e) => {
        const { name, value } = e.target;
        setFormEmployee((prevValue) => {
            return ({ ...prevValue, [name]: value })
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEditMode){
            setLoadingEmployee(true)
            const response = await axios.put(`${serverURL}/api/employee/update_employee/${isEditIdMode}`,formEmployee,{
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials: true
            })
            console.log(response);
            toast.success(response?.data?.message);
            setLoadingEmployee(false);
            setIsEditMode(false);
            setIsEditIdMode(null);
            await setFormEmployee({
                name: "",
                email: "",
                department: "",
                city: "",
                phone: ""
            })
            await fetchEmployees();
        }
        else{
            await addEmployee();
            await setFormEmployee({
                name: "",
                email: "",
                department: "",
                city: "",
                phone: ""
            })
        }  
    }
    return (
        <div className='w-full flex lg:flex-row flex-col items-center justify-center  gap-4'>
            <div className='form lg:w-1/3 w-full h-[600px] bg-white  rounded-lg shadow-lg p-4 flex flex-col gap-4'>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <h1 className='text-[20px] font-bold text-center'>{isEditMode ? 'Update ' : 'Registration '}Form</h1>
                    {
                        form_field_data.map((form_data) => {
                            return (
                                <div key={form_data.id} className='flex flex-col gap-2'>
                                    <label htmlFor={form_data.text} className='text-[16px] font-semibold'>{form_data.text}</label>
                                    <input onChange={handleData} type='text' name={form_data.name} id={form_data.name} placeholder={form_data.message} value={form_data.value} className='w-full h-[40px] border border-gray-300 rounded-md px-2 focus:outline-none focus: ring-2 focus: ring-blue-500' />
                                </div>
                            )
                        })
                    }

                    <div className='flex items-center justify-center mt-2'>
                        <button disabled={loadingEmployee} type='submit' className='w-1/2 h-[40px] bg-blue-600 text-white 
                        font-semibold rounded-md hover:bg-blue-700 transition duration-300'> {loadingEmployee ? <LoadingSpinner/> : isEditMode ? 'Update':'Submit' }</button>
                    </div>
                </form>

            </div>

            <div className='lg:w-4/5 w-full max-w-7xl h-[600px] mx-auto bg-white rounded-xl shadow-lg p-6'>
                <div className='flex items-center md:justify-around md:gap-3 mb-6  sm:justify-center gap-5 md:flex-row flex-col'>
                      <h1 className='text-2xl font-semibold text-center text-gray-800 '>DataSheet</h1>
                      <SearchBar/>
                </div>
                <div className='overflow-x-auto max-h-[520px] overflow-y-auto scrollbar-hide hover:scrollbar-default'>
                    <table className='min-w-full text-sm text-left border-separate border-spacing-y-2 border-spacing-x-0'>
                        <thead className='bg-gradient-to-br rounded-md from-blue-600 to-purple-700 sticky top-0 text-white uppercase text-xs tracking-wider'>
                            <tr>
                                <th className='px-4 py-3'>Id</th>
                                <th className='px-4 py-3'>Name</th>
                                <th className='px-4 py-3'>Email</th>
                                <th className='px-4 py-3'>Department</th>
                                <th className='px-4 py-3'>City</th>
                                <th className='px-4 py-3'>Phone</th>
                                <th className='px-4 py-3 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example row */}
                            {
                                filterData.length === 0 && (
                                    <tr className='bg-white shadow rounded-md hover:shadow-md hover:bg-gray-100 transition duration-300'>
                                        <td colSpan={7} className='text-center py-4 text-gray-500 font-semibold'>Sorry the data is not available....</td>
                                    </tr>
                                )
                            }
                            {
                                filterData.map((item) => (
                                    <tr key={item._id} className='bg-white shadow rounded-md hover:shadow-md hover:bg-gray-100 transition duration-300'>
                                        <td className='px-4 py-3 font-bold'>{item._id.substring(7, 10)}</td>
                                        <td className='px-4 py-3'>{item.name}</td>
                                        <td className='px-4 py-3'>{item.email}</td>
                                        <td className='px-4 py-3'>{item.department}</td>
                                        <td className='px-4 py-3'>{item.city}</td>
                                        <td className='px-4 py-3'>{item.phone}</td>
                                        <td className='px-4 py-3 flex justify-center space-x-2'>
                                            <button onClick={() => handleUpdate(item._id)} className='bg-blue-500 text-[15px] hover:bg-blue-600 text-white px-3 py-2 rounded-md text-xs shadow flex gap-3 items-center'>
                                               <GrUpdate/> Edit
                                            </button>
                                            <button onClick={() => handleDelete(item._id)} className='bg-red-500 text-[15px] hover:bg-red-600 text-white px-3  py-2 rounded-md text-xs shadow flex gap-3 items-center'>
                                               <RiDeleteBinLine />Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}

export default Table_Form