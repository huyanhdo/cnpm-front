import { createContext,useContext,useState,useEffect } from "react";
import {auth} from '../fire_base';
// import app from "../firebase";
import { signOut ,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext({
    currentUser:null,  
    login:()=>Promise,
    logout:()=>Promise
})
// const auth = getAuth();
export const useAuth = ()=>useContext(AuthContext);

export default function AuthContextProvider({children}){
    const [currentUser,setCurrentUser] = useState(null);
    const value = {
        currentUser,
        login,
        logout
    }
    function login(email,password) {
        return signInWithEmailAndPassword(auth,email,password);
     }

     function logout(){
         return signOut(auth);
     } 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,user => setCurrentUser(user))
        return ()=>{unsubscribe()}
    },[])
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}