import type { CardInfoApiProps } from "../../interfaces"
import ApiTitle from "../ApiTitle/ApiTitle"
import styles from "./CardInfoApi.module.css"
const CardInfoApi = ({className,title,description,show=true}:CardInfoApiProps) => {
    return (
        <div className={`${styles.box} d-flex align-items-end gap-4
            ${className=="last"  && "mx-auto w-fit"}
            `}>
            <ApiTitle className="small" title={title}/>
            {
                show && <p className={`${styles.desc} fw-medium`}>{description}</p>
            }
        </div>
    )
}

export default CardInfoApi