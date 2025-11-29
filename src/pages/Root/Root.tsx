import { Outlet } from "react-router-dom"
import SideBar from "../../components/SideBar/SideBar"
const Root = () => {

    return (
        <div className="d-flex">
            <SideBar/>
            <Outlet/>
        </div>
    )
}

export default Root