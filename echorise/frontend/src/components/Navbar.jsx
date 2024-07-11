import React from 'react';
import {Link} from 'react-router-dom';
export default function  Navbar(){
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            {/* Your Navbar component code here */}
        </div>
    );
};

