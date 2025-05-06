
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContext from './ContextAPI/AuthContext.jsx'
import  UserContext_API  from './ContextAPI/UserContext.jsx'
import Table_UserForm from './ContextAPI/Table_UserForm.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <UserContext_API>
      <Table_UserForm>
       <App />
      </Table_UserForm>
    </UserContext_API>
  </AuthContext>
)
