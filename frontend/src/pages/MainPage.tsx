import {Link} from "react-router-dom";
import {Outlet} from "react-router-dom";

export default function MainPage(){
    return(
        <div style={{textAlign: "center", marginTop : "20px"}}>
            <h2 style={{marginTop:"30px", marginBottom:"20px"}}>Video Game Collection Library</h2>
            
            <Link to="/login" className="nav-button" style={{marginRight: "10px"}}>
                Login
            </Link>

            <Link to="/register" className="nav-button">
                Register
            </Link>
            <Outlet />
        </div>
    );
}