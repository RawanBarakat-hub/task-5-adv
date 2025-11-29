import { ButtonGroup } from "react-bootstrap"
import type { BtnsProps } from "../../interfaces"
import ButtonApi from "../ButtonApi/ButtonApi"
const Buttons = ({btns}:BtnsProps) => {
    return (
        <ButtonGroup className="flex-column" aria-label="Basic example">
            {
                btns?.map((btn,index)=>{
                    return <ButtonApi key={index} image={btn.image} text={btn.text} 
                    onClick={btn.onClick}/>
                })      
            }
        </ButtonGroup>
    )
}

export default Buttons