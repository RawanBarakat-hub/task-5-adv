import { useEffect } from "react"
import styles from "./Auth.module.css"
import { Outlet, useNavigate } from "react-router-dom"

const Auth = () => {
    const navigate=useNavigate()
    useEffect(()=>{
        if (localStorage.getItem("token")) {
            navigate("/dashboard")
        }
    },[])
    return (
        <div className={`${styles.auth} vh-100 d-flex justify-content-center align-items-center`}>
            <Outlet/>
        </div>
    )
}

export default Auth