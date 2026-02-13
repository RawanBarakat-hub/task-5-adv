import { Card } from 'react-bootstrap'
import styles from "./CardApi.module.css"
const CardApi = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(user.profile_image_url)
    let userName=user.user_name
    userName=userName.replace("_"," ")
    return (
        <Card className={`${styles.card} w-fit border-0`}>
            <Card.Img
                variant="top"
                src={
                    user.image_url_profile ||    
                    user.profile_image_url ||      
                    "/assets/images/userapi.png"   
                }
                className={`${styles.userImage} rounded-circle`}
                onError={(e) => {
                    e.currentTarget.src = "/assets/images/userapi.png"; 
                }}
                />
            <Card.Body className='p-0'>
                <Card.Title className={`${styles.title} text-capitalize fw-bold text-black m-0 text-center`}>
                    {userName || "Rawan Barakat"}
                </Card.Title>
            </Card.Body>
        </Card>
    )
}

export default CardApi