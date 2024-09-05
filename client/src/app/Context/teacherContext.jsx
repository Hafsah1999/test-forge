import { createContext, useContext, useState } from "react";
import { useRouter } from 'next/navigation';


const AppContext = createContext();

export const AppProvider = ({ children  }) => {

    const [ currentTeacher, setcurrentTeacher ] = useState(
        (localStorage.getItem('teacherId'))
      );

    const [loggedIn, setLoggedIn] = useState(currentTeacher !== null);
    const router=useRouter();

    const logout = () => {
        localStorage.removeItem('teacherId');
        setLoggedIn(false);
        router.push('/Teacher-login');
    }

    return (
        <AppContext.Provider value={{ loggedIn, setLoggedIn, logout, currentTeacher, setcurrentTeacher }} >
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => useContext(AppContext);
export default useAppContext;