import {Link} from "react-router-dom";
import {Outlet} from "react-router-dom";
import "../style/MainPage.css";

export default function MainPage(){
    return(
        <div className="header">
            <h2 className="title">Video Game Collection Library</h2>
            <h3>Create your personal video game collection: add the games you’ve played, write your own descriptions, 
                explore new titles, and keep everything organized in one clean and simple library.</h3>
            
            <Link to="/login" className="nav-button-mainpage">
                Login
            </Link>

            <Link to="/register" className="nav-button-mainpage">
                Register
            </Link>
            <Outlet />
        </div>
    );
}