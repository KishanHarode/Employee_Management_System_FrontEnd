import React, { useContext, useRef, useState } from 'react';
import { FaUser, FaUserCheck } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext_API } from '../ContextAPI/AuthContext';
import axios from 'axios';
import { UserContext_API } from '../ContextAPI/UserContext';
import { toast } from 'react-toastify';
import { Table_UserFormContext } from '../ContextAPI/Table_UserForm';
import { FaEye,FaEyeSlash} from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';
import dp_user_image from '../assets/dp_user.jpg';
import { IoCamera } from "react-icons/io5";

const SignUp = () => {
    const { serverURL } = useContext(AuthContext_API);
    const{setUser,fetchUser} = useContext(UserContext_API);
    const{fetchEmployees} = useContext(Table_UserFormContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
    });

    const [backendImage, setBackEndImage] = useState(null);
    const [frontendImage,setFrontendImage] = useState(dp_user_image);
    const image = useRef();
    const handleImageClick = () => {
        console.log(image.current.click());
    }

    const [showPassword,setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageData = (e) => {
        let file = e.target.files[0];
        setBackEndImage(file);
        const file_create = URL.createObjectURL(file);
        setFrontendImage(file_create);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData_1 = new FormData();
        formData_1.append('firstName',formData.firstName);
        formData_1.append('lastName',formData.lastName);
        formData_1.append('userName',formData.userName);
        formData_1.append('email',formData.email);
        formData_1.append('password',formData.password);
        if(backendImage){
            formData_1.append('image',backendImage);
        }
        const data = formData_1;
        try {
            const response = await axios.post(`${serverURL}/api/auth/user/signup`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            });
            console.log(response?.data);
            console.log(response?.data?.message); // You may want to use response.data instead of the whole response
            await fetchUser();
            setUser(response?.data?.newUser);
            setTimeout(() => {
                setLoading(false);
                navigate('/dashboard');
            }, 3000);
            toast.success(response?.data?.message);
            await fetchEmployees();
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Network Connection Error....');
            setLoading(false);
        }
    };
    

    const fields = [
        {
            id: 1,
            icon: <FaUserCheck />,
            placeholder: 'First Name...',
            type: 'text',
            value: formData.firstName,
            name: 'firstName',
        },
        {
            id: 2,
            icon: <FaUserCheck />,
            placeholder: 'Last Name...',
            type: 'text',
            value: formData.lastName,
            name: 'lastName',
        },
        {
            id: 3,
            icon: <FaUser />,
            placeholder: 'Username...',
            type: 'text',
            value: formData.userName,
            name: 'userName',
        },
        {
            id: 4,
            icon: <MdEmail />,
            placeholder: 'Email...',
            type: 'text', // FIX: correct type for email input
            value: formData.email,
            name: 'email',
        },
        {
            id: 5,
            icon: <RiLockPasswordFill />,
            placeholder: 'Password...',
            type: 'password',
            value: formData.password,
            name: 'password',
        },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-[30px] font-bold text-center mb-3 flex items-center justify-center">Sign Up</h2>
                <div className='flex items-center justify-center mb-3'>
                    <div className='relative'>
                    <div className='h-[90px] w-[90px] shadow-md shadow-gray-500 rounded-full overflow-hidden flex items-center justify-center'>
                        <img src={frontendImage} className=' h-[125px] w-[125px] opacity-8 rounded-full object-cover cursor-pointer z-20'/>    
                    </div>
                    <IoCamera className='absolute top-[55px] text-slate-700 -right-1 z-30 cursor-pointer' size={20} onClick={handleImageClick}/>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <div className="mb-4 relative" key={field.id}>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                {field.icon}
                            </div>
                            {
                                field.name === 'password' ? 
                                <>
                                 <input
                                 type={showPassword ? 'text' : field.type}
                                 name={field.name}
                                 value={field.value}
                                 onChange={handleChange}
                                 placeholder={field.placeholder}
                                 className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                 />
                                 <div
                                    // className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer"
                                    className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                 >
                                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                                  </div>
                                </>
                                :
                                <input
                                type={field.type}
                                name={field.name}
                                value={field.value}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            // ensures input fields are filled before submit
                            />

                            }
                            <input type='file' ref={image} accept='image/*' hidden onChange={handleImageData}/>
                               
                        </div>
                    ))}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
                    >
                        {loading ? <LoadingSpinner/> : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm font-semibold text-gray-600">
                    Already have an account?{' '}
                    <Link to="/signin" className="text-blue-600 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
