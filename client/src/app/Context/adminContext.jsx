import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setCurrentAdmin(JSON.parse(localStorage.getItem('admin')));
        setLoggedIn(true);
      }
    }, []);
  
    const logout = () => {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      setLoggedIn(false);
      setCurrentAdmin(null);
      router.push('/');
    }
  
    return (
      <AdminContext.Provider value={{ loggedIn, setLoggedIn, logout, currentAdmin, setCurrentAdmin }}>
        {children}
      </AdminContext.Provider>
    );
  }
const useAdminContext = () => useContext(AdminContext);
export default useAdminContext;