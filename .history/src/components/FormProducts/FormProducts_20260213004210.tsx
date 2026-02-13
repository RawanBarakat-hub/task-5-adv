import { Button, Form } from "react-bootstrap"
import type { FormProductsProps } from "../../interfaces"
import styles from "./FormProducts.module.css"
import type { FormEvent } from "react";
const FormProducts = ({className,className1,show=false,inputs,sendData,submit}:FormProductsProps) => {
    let data: any = {};
    inputs.forEach(input => {
        if (input.type !== "file") {
            data[input.name] = input.value;   
        }
    });
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendData(data);
    };
    return (
        <Form className={`${styles[className ?? ""]} ${className1=="add" && "d-grid"}`}
        onSubmit={handleSubmit}>
            {
                inputs?.map((input,index)=>{
                    return <Form.Group className={`${styles[className ?? ""]}`} key={index}>
                                {show && <Form.Label 
                                className={`${styles.label} fw-medium mb-3 
                                ${input.type=="file" && styles.mb_label }`}>{input.label}</Form.Label>}
                                {input.type === "file" ? (
                                <>
                                    <input
                                        type="file"
                                        id="profileImageInput"
                                        className="d-none"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) {
                                                data[input.name] = file;     
                                            } else {
                                                data[input.name] = input.value;  
                                            }
                                        }}/>
                                    <div className={`${styles.imageBox} 
                                    d-flex justify-content-center align-items-center border-1 rounded-1 mb-0
                                    input_image py-2`}
                                        onClick={() =>
                                            document.getElementById("profileImageInput")?.click()}>
                                        {
                                            input.value?<img src={input.value} alt={input.name} className={`${styles.image}
                                            h-100`}/>:
                                            <img src="/assets/images/uploadicon.svg" alt="upload"
                                            className={styles.uploadIcon} />
                                        }
                                    </div>
                                </>
                            ) : (
                                <Form.Control 
                                className={`${className=="products" 
                                && "mx-auto mt-4 fs_14 p-0 rounded-3"}
                                padding_input border_color info_input
                                `} 
                                type={input.type} placeholder={input.placeholder}
                                defaultValue={input.value}
                                onChange={(event) =>
                                    (data = {
                                        ...data,
                                        [input.name]: event.target.value
                                    })
                                }
                                /> )} 
                            </Form.Group> 
                }) 
            }
            {
                show && <Button variant="primary" type="submit"
                            className={`${styles.btn} my_bg_primary border-0 rounded-0
                            rounded-1 fw-medium fs-2 mx-auto`}>{submit}
                        </Button>
            }
    </Form>
    )
}

export default FormProducts