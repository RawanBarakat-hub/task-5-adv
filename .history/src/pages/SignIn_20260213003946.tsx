import { useEffect, useState } from "react"
import FormApi from "../components/FormApi/FormApi"
import type { LoginInterface , Input } from "../interfaces"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const [data,setData]=useState<LoginInterface>({
        "email":"",
        "password":""
    })
    const navigate=useNavigate()
    const inputs:Array<Input>=[
        {
            name:"email",
            label:"Email",
            type:"email",
            placeholder:"Enter your email",
        },
        {
            name:"password",
            label:"Password",
            type:"password",
            placeholder:"Enter your password",
        }
    ]
    useEffect(()=>{
        if (data.email!="") {
            axios.post("https://dashboard-i552.onrender.com/api/login",data,{headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            }})
            .then(res=>{
                console.log(res.data)
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.user))
                navigate("/dashboard")
            })
            .catch(err =>console.log(err))
        }
    },[data])
    const sendData=(data:LoginInterface)=>{
        setData(data)
    }
    return (
        <div>
            <FormApi
            className="signin"
            image="/assets/images/Logo.png"
            title="Sign In"
            description="Enter your credentials to access your account"
            inputs={inputs}
            submit="Sign In"
            additionalInfo="Don’t have an account? "
            link={
                {
                    url:"/signup",
                    text:"Create one"
                }
            }
            sendData={sendData}/>
        </div>
    )
}

export default SignIn