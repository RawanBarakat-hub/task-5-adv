import styles from "./SideBar.module.css"
import { Image } from "react-bootstrap";
import CardApi from "../CardApi/CardApi";
import Buttons from "../Buttons/Buttons";
import type { Btn } from "../../interfaces";
import ButtonApi from "../ButtonApi/ButtonApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
    const navigate=useNavigate()
    const showItems=()=>{
        window.location.reload()
    }
    const btns:Array<Btn>=[
        {
            image:"/assets/images/products.svg",
            text:"Products",
            onClick: showItems
        },
        {
            image:"/assets/images/saved.svg",
            text:"Favorites"
        },
        {
            image:"/assets/images/saved.svg",
            text:"order list"
        }
    ]
    const logOut=()=>{
        axios.post("https://dashboard-i552.onrender.com/api/logout",null,{
            headers:{
                "Accept":"application/json",
                "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>{
            console.log(res.data)
            localStorage.removeItem("token")
            navigate("/")
        })
        .catch(err=>console.log(err))
    }
    return (
        <div className={`${styles.side} min-vh-100 h-auto position-relative d-flex flex-column align-items-center`}>
            <div className={`${styles.image_wrapper} w-fit border-start border-4`}>
                <Image  src="/assets/images/Logo.png" className={styles.logo}/>
            </div>
            <CardApi/>
            <Buttons btns={btns}/>
            <ButtonApi onClick={logOut} className="log_out" image="/assets/images/logout.svg" text="Logout" />
        </div>

        
    )
}

export default SideBar