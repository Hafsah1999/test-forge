import { createContext, useContext, useState } from "react";
import { useRouter } from 'next/navigation';


const StudentContext = createContext();

export const StudentProvider = ({ children  }) => {

    const [ currentUser, setCurrentUser ] = useState(
        JSON.parse(localStorage.getItem('student'))
      );

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);
    const router=useRouter();

    const logout = () => {
        localStorage.removeItem('student');
        setLoggedIn(false);
        router.push('/login');
    }

    return (
        <StudentContext.Provider value={{ loggedIn, setLoggedIn, logout, currentUser, setCurrentUser }} >
            {children}
        </StudentContext.Provider>
    )
}

const useStudentContext = () => useContext(StudentContext);
export default useStudentContext;