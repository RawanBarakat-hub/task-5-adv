import axios from "axios"
import type { Item } from "../interfaces"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card } from "react-bootstrap"
import styles from "./ProductInfo.module.css"
import CardInfoApi from "../components/CardInfoApi/CardInfoApi"
const ProductInfo = () => {
    const params=useParams()
    const [item,setItem]=useState<Item>({
        id:0,
        name:"",
        price:"",
        image_url:"",
        created_at:"",
        updated_at:"",
        })
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
        const formatDate = (dateString?: string | null) => {
            if (!dateString) return "N/A"; 
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "N/A";
            return new Intl.DateTimeFormat("en-GB").format(date);
            };

    return (
        <div>
            <Card className="border-0 w-100">
                <CardInfoApi title={item.name}/>
                <Card.Img variant="top" src={item.image_url} className={`${styles.image} mx-auto`} />
                <Card.Body>
                    <div className={`${styles.box} d-flex justify-content-between`}>
                        <CardInfoApi title="price:" description={`${item.price}$`} />
                        <CardInfoApi title="Added at:" description={formatDate(item.created_at)}/>
                    </div>
                    <CardInfoApi className="last" title="updated at:" description={formatDate(item.updated_at)}/>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ProductInfo