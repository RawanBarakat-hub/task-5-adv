import { Button, Image } from "react-bootstrap"
import styles from "./ButtonApi.module.css"
import type { Btn } from "../../interfaces"
const ButtonApi = ({className,image,text,show=true,onClick}:Btn) => {
    
    return (
        <Button className={`${styles.my_btn} ${styles[className ?? ""]}
        ${className=="log_out" && "flex-row-reverse position-absolute bottom-0"} 
        d-flex justify-content-center align-items-center text-black fs_14 fw-medium
        border-0 rounded-0 rounded-1 mb-2 bg-transparent
        ${text=="Products" && styles.active}`}
        variant="secondary" onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        }}>
            {show && <Image src={image} />}
            {text}
        </Button>
    )
}

export default ButtonApi
