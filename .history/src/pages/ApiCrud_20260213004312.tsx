import { Button, Image } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"
import styles from "./ApiCrud.module.css"
const ApiCrud = () => {
    return (
        <div className={`${styles.whiteSpacing} flex-grow-1  mt-4 mb-5`}>
            <Button as={Link as any} to="/dashboard" variant="link" 
                className={`${styles.arrow} 
                d-flex justify-content-center align-items-center
                border border-black rounded-circle`}>
                <Image src="/assets/images/arrow.svg" />
            </Button>
            <Outlet/>
        </div>
    )
}

export default ApiCrud