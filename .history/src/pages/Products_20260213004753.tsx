import { Link, useLoaderData, useNavigate } from "react-router-dom"
import FormProducts from "../components/FormProducts/FormProducts"
import type { Input, Item } from "../interfaces"
import { Button, Card, CardGroup, Image, Modal } from "react-bootstrap"
import styles from "./Products.module.css"
import PaginationApi from "../components/PaginationApi/PaginationApi"
import axios from "axios"
import { useState } from "react"
import LinkApi from "../components/LinkApi/LinkApi"
const Products = () => {
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const items = useLoaderData<Array<Item>>() || [];
    const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()));
    const itemsNumber = filteredItems.length;
    const screenWidth = window.innerWidth;
    const itemsPerPage =
        screenWidth >= 1200 ? 8 :
        screenWidth >= 768 ? 6 :
        4;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = filteredItems.slice(start, end);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate=useNavigate()
    const deleteItem=(id:number)=>{
        axios.delete(`https://dashboard-i552.onrender.com/api/items/${id}`,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
                "Accept":"application/json"
            }
        })
        .then(res=>{
            console.log(res)
            navigate("/dashboard")
        })
        .catch(err=>console.log(err))
    }
    const input:Array<Input>=[
        {
            name:"name",
            type:"string",
            placeholder:"Search product by name"
        }
    ]
    console.log(items)
    return (
        <div className="flex-grow-1 white_spacing">
            <Modal show={show} onHide={handleClose} centered className={`${styles.popup} d-flex justify-content-center align-items-center`}>
                <Modal.Header className="border-0">
                    <Modal.Title className={`${styles.title_pop} text-center text-uppercase fw-semibold`}>Are you sure you want to delete the product?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-between w-100">
                    <Button className={`${styles.btn} border-0 fw-medium fs-2 my_bg_primary`} onClick={() => {
                        if (selectedId !== null) {
                            deleteItem(selectedId)
                            handleClose()
                        }
                    }}>Yes</Button>
                    <Button className={`${styles.btn} border-0 fw-medium fs-2 my_bg_primary`} onClick={handleClose}>No</Button>
                </Modal.Body>
            </Modal>
            <FormProducts 
                className="products" 
                inputs={input} 
                sendData={(data) => {
                    setSearchText(data.name);
                    setPage(1);
                }}
            />
            <LinkApi className="add" url="/dashboard/api/add" text="Add New Product"/>
            {(items && items.length!=0) ? (
                <CardGroup className={`${styles.cards} d-grid justify-content-between`}>
                        {paginatedItems.map(item => (
                            <Button as={Link as any} variant="link" to={`/dashboard/api/info/${item.id}`}
                            className="d-flex p-0"> 
                                <Card 
                                key={item.id} 
                                className={`${styles.card} px-3 border-0 rounded-4 position-relative
                                `}
                            >
                                <Card.Img                                 
                                    variant="top" 
                                    src={item.image_url} 
                                    className={`${styles.image} my-3 mx-auto mw-100`} 
                                    onError={(e) => {
                                        e.currentTarget.src = "/assets/images/box.png"; 
                                    }}
                                />
                                <Card.ImgOverlay className={`${styles.hover_content} opacity-0`}>
                                    <Card.Body p-0>
                                        <Card.Title className={`${styles.title} text-center`}>{item.name}</Card.Title>
                                            <div className="d-flex w-fit gap-2 mx-auto">
                                                <LinkApi className="edit" url={`/dashboard/api/edit/${item.id}`} text="Edit"/>
                                                <Button className={`${styles.delete} text-white fs_14 fw-medium
                                                    border-0 rounded-0 rounded-1 `}
                                                    onClick={(e) => {
                                                        e.preventDefault();    
                                                        e.stopPropagation(); 
                                                        setSelectedId(item.id);   
                                                        handleShow();  
                                                    }}
                                                >delete</Button>
                                            </div>
                                    </Card.Body>
                                </Card.ImgOverlay>
                            </Card>
                            </Button>
                        ))}
                </CardGroup>
            ) : (
                    <Image src="/assets/images/box.png" />
            )}
            <PaginationApi 
                itemsNumber={itemsNumber} 
                itemsPerPage={itemsPerPage}
                onPageChange={(p) => setPage(p)}
            />
        </div>
    )
}

export default Products
