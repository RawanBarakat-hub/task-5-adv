import { useEffect, useState } from "react"
import FormApi from "../components/FormApi/FormApi"
import type { Input, SignUpInterface } from "../interfaces"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
    const [data,setData]=useState<SignUpInterface>({
        first_name:"",
        last_name:"",
        user_name:"",
        email:"",
        password:"",
        password_confirmation:"",
        profile_image:null
    })
    const navigate=useNavigate()
    useEffect(()=>{
        if (data.first_name!="") {
            data.user_name=data.first_name+"_"+data.last_name
            axios.post("https://dashboard-i552.onrender.com/api/register",data,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    "Accept":"application/json"
                }
            })
            .then(res=>{
                console.log(res)
                localStorage.setItem("token",res.data.data.token)
                localStorage.setItem("user", JSON.stringify(res.data.data.user))
                navigate("/dashboard")
            })
            .catch(err => console.log(err))
        }
    },[data])
    const inputs:Array<Input>=[
        {
            name:"first_name",
            label:"Name",
            type:"text",
            placeholder:"First Name",
        },
        {
            name:"last_name",
            type:"text",
            placeholder:"Last Name",
        },
        {
            name:"email",
            label:"Email",
            type:"email",
            placeholder:"Enter your email",
        },
        {
            name: "password",
            label:"Password",
            type:"password",
            placeholder:"Enter password",
        },
        {
            name:"password_confirmation",
            type:"password",
            placeholder:"Re-enter your password",
        },
        {
            name:"profile_image",
            label:"Profile Image",
            type:"file"
        }
    ]
    const sendData=(data:SignUpInterface)=>{
        setData(data)
    }
    return (
        <div>
            <FormApi
            className="signup"
            image="/assets/images/Logo.png"
            title="Sign up"
            description="Fill in the following fields to create an account."
            inputs={inputs}
            submit="Sign Up"
            additionalInfo="Do you have an account? "
            link={{url:"/",text:"Sign In"}}
            sendData={sendData}/>
        </div>
    )
}

export default SignUp