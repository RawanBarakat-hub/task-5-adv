import { useEffect, useState } from "react"
import ApiTitle from "../components/ApiTitle/ApiTitle"
import type { AddItem, Input, Item } from "../interfaces"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import FormProducts from "../components/FormProducts/FormProducts"

const Edit = () => {
    const params=useParams()
    const [item,setItem]=useState<Item>({
        id:0,
        name:"",
        price:"",
        image_url:"",
        created_at:"",
        updated_at:"",
    })
    const [updated,setUpdated]=useState<AddItem>({
        name:"",
        price:0,
        image:null
    })
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get(`https://dashboard-i552.onrender.com/api/items/${params.id}`,{
        headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`,
            "Accept":"application/json"
        }
        })
        .then(res=>{
            console.log(res.data)
            setItem(res.data)
            console.log(item)
        })
        .catch(err=>console.log(err))
        },[])
    useEffect(()=>{
        axios.post(`https://dashboard-i552.onrender.com/api/items/${params.id}`,{...updated,_method:"PUT"},{
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
        .catch(err => console.error("API Error:", err.response?.data || err));
    },[updated])
    const inputs:Array<Input>=[
        {
            name:"name",
            label:"Name",
            type:"text",
            placeholder:"Enter the product name",
            value:item.name
        },
        {
            name:"image",
            label:"Image",
            type:"file",
            value:item.image_url
        },
        {
            name:"price",
            label:"Price",
            type:"text",
            placeholder:"Enter the product price",
            value:item.price
        }
        ]
    const sendData=(data:AddItem)=>{
        setUpdated(data)
    }
    return (
        <div>
            <ApiTitle title="Edit Item"/>
            <FormProducts className="box" className1="add" show={true} inputs={inputs}
            sendData={sendData}
            submit="Save"/>
        </div>
    )
}

export default Edit