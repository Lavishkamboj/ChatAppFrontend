import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
  


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not checked yet
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch('https://chatappbackend-production-40a2.up.railway.app/auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      if (res.ok) {
     
        setUser(true);
      } else {
      
        setUser(false);
      }
    } catch (err) {
     
      console.error(err);
      
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <>
    
    <AuthContext.Provider value={{ user, setUser, checkAuth, loading }}>
      {children}
    </AuthContext.Provider>
      
   
    </>
    
  );
};
