import type { ApiTitleProps } from "../../interfaces"
import styles from "./ApiTitle.module.css"
const ApiTitle = ({className,title}:ApiTitleProps) => {
    return (
        <div>
            <h1 className={`${styles.title} 
            ${className=="small" && "text-capitalize"}
            text-uppercase fw-semibold text-black`}>{title}</h1>
        </div>
    )
}

export default ApiTitle