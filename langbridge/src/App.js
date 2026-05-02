
import './App.css';
import './assets/css/flex.css'
import './assets/css/style.css'
import './assets/css/position.css'
import AllRoutes from './Route/routes';
import { createContext } from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();
function App() {
      const navigate = useNavigate();
      const [user, setUser] = useState(null);
  
      useEffect(() => {
          const token = localStorage.getItem("tokenAdmin");
          if (token) {
              setUser(token);
          }
      })
  
      const login = (token) => {
        localStorage.setItem("tokenAdmin",token);
          setUser(token);
          navigate("/admin");
      }
      
  return (
    <>
        <AuthContext.Provider value={{ user, login }}>
            <AllRoutes />
        </AuthContext.Provider>
    </>
  )
}

export default App;
