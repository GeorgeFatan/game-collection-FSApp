import {Navbar} from "./Navbar";
import {Outlet} from "react-router-dom";

export function Layout(){
    return(
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Navbar/>
            <main className="p-6">
                <Outlet/>
            </main>
        </div>
    );
}