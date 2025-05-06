import React, { useContext } from 'react'
import SignUp from '../Components/SignUp'
import SignIn from '../Components/SignIn'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../Components/Dashboard'
import { UserContext_API } from '../ContextAPI/UserContext'
import ToastProvider from '../ToastProvider/ToastProvider'

const RouteWrapper = () => {
    const {user} = useContext(UserContext_API);
    const routes = [
        {
            id: 1,
            path:'/signup',
            element: user ? <Navigate to = '/dashboard'/> : <SignUp/> ,
        },
        {
            id:2,
            path:'/signin',
            element: user ? <Navigate to = '/dashboard'/> : <SignIn/>,
        },
        {
            id: 3,
            path: '/dashboard',
            element: user ? <Dashboard/> : <Navigate to = '/signin'/>,
        },
        {
            id:3,
            path: '/',
            element: user ? <Dashboard/> : <Navigate to = '/signin'/>
        },
        {
            id:4,
            path:'*',
            element: user ? <Dashboard/> : <Navigate to={'/signin'}/>
        }
    ]
  return (
    <>
        <BrowserRouter>
        <ToastProvider/>
           <Routes>
            {
                routes.map((route)=>{
                    return(
                        <Route path={route.path} element={route.element} key={route.id}/>
                    )
                })
            }
           </Routes>
        </BrowserRouter>
    
    </>
  )
}

export default RouteWrapper