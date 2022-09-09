import React from "react"
import { Link} from 'react-router-dom'
function Navigation() {



    return (

        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container">
                <Link className="navbar-brand " to="/">Table</Link>
                <Link className="navbar-brand " to="/Sales">Sales</Link>
                <Link className="navbar-brand " to="/Employees">Employees</Link>
            </div>
        </nav>
    )
}

export default Navigation