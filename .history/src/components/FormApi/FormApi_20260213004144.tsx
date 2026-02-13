import styles from "./FormApi.module.css";
import { Button, Form, Image } from "react-bootstrap";
import type { FormApiProps } from "../../interfaces";
import { Link } from "react-router-dom";
import type { FormEvent } from "react";
const FormApi = ({
    className,
    image,
    title,
    description,
    inputs,
    submit,
    additionalInfo,
    link,
    sendData
}: FormApiProps) => {
    let data: any = {};
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendData(data);
    };
    return (
        <div className={`${styles[className ?? ""]} ${styles.infos} bg-white `}>
            <div className="mx-auto d-block w-fit">
                <Image src={image}/>
            </div>
            <h2 className={`${styles.title} text-center fw-semibold text-uppercase text-black`}>{title}</h2>
            <p className={`${className=="signin" && styles.desc} 
            ${className=="signup" && "mb-4"}
            text-center fs_14 my_text_secondary`}>{description}</p>
            <Form onSubmit={handleSubmit}>
                {inputs.map((input, index) => {
                    return (
                        <Form.Group
                            key={index}
                            className={`
                                ${styles.box}
                                mb-0
                                ${
                                    className === "signup" &&
                                    ["first_name", "last_name", "password", "password_confirmation"].includes(input.name)
                                        && "d-inline-block"}
                                ${
                                    className === "signup" &&
                                    ["first_name", "password"].includes(input.name)
                                        && "me-4"}
                                ${
                                    className==="signup" && "mb-3"
                                }`}>
                            <Form.Label className={`${styles.label_input} mb-0 fw-medium fs_14`}>{input.label}</Form.Label>
                            {input.type === "file" ? (
                                <>
                                    <input
                                        type="file"
                                        id="profileImageInput"
                                        className="d-none"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) {
                                                data = { ...data, [input.name]: file };
                                            }
                                        }}/>
                                    <div className={`${styles.imageBox} d-flex justify-content-center align-items-center border rounded-1 mb-0`}
                                        onClick={() =>
                                            document.getElementById("profileImageInput")?.click()}>
                                        <img src="/assets/images/uploadicon.svg" alt="upload" className={styles.uploadIcon} />
                                    </div>
                                </>
                            ) : (
                                <Form.Control
                                    className={`${styles.info_input} p-0 rounded-0 rounded-1`}
                                    type={input.type}
                                    placeholder={input.placeholder}
                                    onChange={(event) =>
                                        (data = {
                                            ...data,
                                            [input.name]: event.target.value
                                        })
                                    }
                                />
                            )}
                        </Form.Group>
                    );
                })}
                <div className="d-grid gap-2">
                    <Button
                        className={`${styles.my_btn} fw-medium text-uppercase rounded-0 rounded-1 my_bg_primary border-0 m-0 fs_14`}
                        variant="primary"
                        size="lg"
                        type="submit"
                    >{submit}</Button>
                </div>
            </Form>
            <p className="text-center my_text_secondary fs_14">
                {additionalInfo}
                <Button as={Link as any} variant="link" className={styles.link} to={link?.url}>
                    {link?.text}
                </Button>
            </p>
        </div>
    );
};

export default FormApi;
