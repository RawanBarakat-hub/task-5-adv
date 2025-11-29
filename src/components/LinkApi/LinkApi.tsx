import { Link } from "react-router-dom"
import styles from "./LinkApi.module.css"
import type {  LinkApiP } from "../../interfaces"
import { Button } from "react-bootstrap"
const LinkApi = ({className,url,text}:LinkApiP) => {
    return (
        <Button as={Link as any} variant="link" className={`${styles[className ?? ""]} 
        my_bg_primary rounded-1 fs_14 text-decoration-none text-white d-flex justify-content-center align-items-center
        ${className=="add" && " px-4 ms-auto d-block w-fit text-uppercase mt-5"}`} 
        to={url}>{text}</Button>
    )
}

export default LinkApi