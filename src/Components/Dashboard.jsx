import React, { useContext, useState } from 'react';
import { UserContext_API } from '../ContextAPI/UserContext';
import { FaUser, FaEnvelope, FaUsers, FaUserCircle } from 'react-icons/fa';
import { BiLogOutCircle } from "react-icons/bi";
import Table_Form from './Table_Form';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { user, logoutUser } = useContext(UserContext_API);
  const [show, setShow] = useState(false);

  const getInitial = (name) => {
    return name ? name.substring(0, 1).toUpperCase() : '';
  };

  const IsConfirmLogout = async () => {
    const logout_result = await Swal.fire({
      title: "Logout ?",
      text: "Are you sure you want to log out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, log me out!'
    });
    if (logout_result.isConfirmed) {
      await logoutUser();
    }
  };

  return (
    <div className='w-full bg-gradient-to-br from-blue-600 to-purple-700 p-4 lg:h-screen h-full relative'>
      <nav className='w-full h-[60px] md:px-6 md:py-3 px-2 py-3 rounded-lg shadow-lg bg-white flex items-center justify-between mb-8'>
        {/* Left Section */}
        <div className='flex items-center gap-4'>
          <div className={`${user.UserImage ? 'w-[55px] h-[50px]' : 'w-[30px] h-[30px]'} rounded-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center`}>
            {user.UserImage ? (
              <img src={user.UserImage} className='h-full w-full rounded-full object-cover' alt="User" />
            ) : (
              <FaUserCircle className='text-white text-[60px]' />
            )}
          </div>
          <h1 className='md:text-[17px] text-[13px] font-semibold'>
            Welcome To, {user?.firstName} {user?.lastName}
          </h1>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-3 relative'>
          <button
            className='bg-gradient-to-br flex items-center justify-center gap-2 from-blue-600 to-purple-700 text-white rounded-lg md:px-5 md:py-2 px-2 py-2 hover:from-blue-500 hover:to-purple-500 transition-all duration-300'
            onClick={IsConfirmLogout}
          >
            Logout <BiLogOutCircle />
          </button>
          <div
            onClick={() => setShow(!show)}
            className='w-[35px] h-[35px] text-white text-[16px] font-semibold rounded-full bg-gradient-to-b from-red-500 to-red-700 flex items-center justify-center cursor-pointer'
          >
            {getInitial(user?.firstName)}
          </div>
          {show && (
            <div className="absolute top-[95px] right-0 w-[250px] bg-white shadow-xl rounded-xl p-4 z-50 border border-gray-100">
              <h2 className="text-[16px] font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-4">
                <FaUser className="text-blue-600" /> User Info
              </h2>

              <div className="flex items-start gap-4 mb-2">
                <FaUser className="text-blue-700 mt-[2px]" />
                <p className="text-[14px] text-gray-700 font-semibold break-words">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>

              <div className="flex items-start gap-4 mb-2">
                <FaEnvelope className="text-blue-700 mt-[2px]" />
                <p className="text-[14px] text-gray-700 font-semibold break-words">
                  {user.email.length > 20 ? user.email.substring(0,18)+".." : user.email}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <FaUsers size={18} className="text-blue-700 mt-[2px]" />
                <p className="text-[14px] text-gray-700 font-semibold break-words">
                  {user?.userName}
                </p>
              </div>
            </div>
          )}
        </div>
      </nav>
      <Table_Form />
    </div>
  );
};

export default Dashboard;
