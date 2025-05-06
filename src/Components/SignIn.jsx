import React, { useContext, useState } from 'react'
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext_API } from '../ContextAPI/AuthContext';
import axios from 'axios';
import { UserContext_API } from '../ContextAPI/UserContext';
import { Table_UserFormContext } from '../ContextAPI/Table_UserForm';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';



const SignIn = () => {
  const [showPassword,setShowPassword] = useState();
  const { serverURL } = useContext(AuthContext_API);
  const {setUser,fetchUser} = useContext(UserContext_API);
  const {fetchEmployees} = useContext(Table_UserFormContext);
  const [ formData, setFormData ] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handlePassword = () => {
    setShowPassword((prev) => {
      return !prev;
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = { ...formData };

    try {
      const response = await axios.post(`${serverURL}/api/auth/user/signin`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response?.data?.message); // You may want to use response.data instead of the whole response
      
      await fetchUser();
      setUser(response?.data?.UserExists);
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 2000);
      await fetchEmployees();
      toast.success(response?.data?.message);

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };
  const fields = [
    {
      id: 1,
      icon: <MdEmail />,
      placeholder: "Email...",
      type: "text",
      value: formData.email,
      name: 'email',
    },
    {
      id: 2,
      icon: <RiLockPasswordFill />,
      placeholder: "Password...",
      type: "password",
      value: formData.password,
      name: 'password',
    }
  ]

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-600 to-purple-700 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">SignIn</h2>

        <form onSubmit={handleSubmit}>
          {
            fields.map((field) => {
              return (
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
                      className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      placeholder={field.placeholder}
                      />
                      <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 cursor-pointer' onClick={handlePassword}>
                         {showPassword ? <FaEyeSlash/> : <FaEye/>}
                      </div>
                    </>
                    :
                    <input
                    type={field.type}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={field.placeholder}
                  />
                  }
                </div>
              )
            })
          }

          <button
            type="submit"
            disabled = {loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
          >
            {loading ? <LoadingSpinner/> : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 font-semibold">
          Don't have an account?{' '}
          <Link to={'/signup'} className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn