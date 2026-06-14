import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../auth'

import Home from '../component/Home'          
import Navbar from '../component/Navbar'      
import Signup from '../component/Signup'      
import Login from '../component/Login'        
import Logout from '../component/Logout'      
import Users from '../component/Users'  
import About from '../component/About'      
import Conversation from '../component/Conversation'  
import { Navigate } from 'react-router-dom';
import { useContext, useState } from 'react'

function App() {
  

  const { user, loading } = useContext(AuthContext);
   if (loading) {
    return <p style={{color: 'white', textAlign: 'center'}}>Checking authentication...</p>;
  }

  
  return (
    <Router>
      <Navbar/>
    <Routes>
     
      <Route path="/"        element={<Home />} />
      <Route path="/about"        element={<About />} />
      <Route path="/login"   element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/sign-up" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route path="/logout"  element={<Logout />} />

    
     
        <Route path="/users"        element={!user?<Navigate to="/login"/>:<Users />} />
        <Route path="/conversation" element={!user?<Navigate to="/login"/>:<Conversation />} />
      
    </Routes>
    </Router>
  )
}

export default App  
