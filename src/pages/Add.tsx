import { useEffect, useState } from "react"
import ApiTitle from "../components/ApiTitle/ApiTitle"
import FormProducts from "../components/FormProducts/FormProducts"
import type { AddItem, Input } from "../interfaces"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Add = () => {
    const [item,setItem]=useState<AddItem>({
        name:"",
        price:0,
        image:null,
    })
    const navigate=useNavigate()
    useEffect(()=>{
        if (item.name!="") {
            console.log(item)
            axios.post("https://dashboard-i552.onrender.com/api/items",item,{
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(res=>{
                console.log(res)
                navigate("/dashboard")
            })
            .catch(err => console.log(err));
        }
    },[item])
    const inputs:Array<Input>=[
        {
            name:"name",
            label:"Name",
            type:"text",
            placeholder:"Enter the product name" 
        },
        {
            name:"image",
            label:"Image",
            type:"file"
        },
        {
            name:"price",
            label:"Price",
            type:"text",
            placeholder:"Enter the product price" 
        }
    ]
    const sendData=(data:AddItem)=>{
        setItem(data)
    }
    return (
        <div>
            <ApiTitle title="Add New Item"/>
            <FormProducts  className="box" className1="add" show={true} inputs={inputs}
            sendData={sendData}
            submit="Save"/>
        </div>
    )
}

export default Add