import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutHomePage = () => {
    return (
        <div>
            <h1>Welcome to FitTribe!</h1>
            <p>Please <Link to="/signin">Sign In</Link> or <Link to="/signup">Sign Up</Link> to get started.</p>
        </div>
    );
};

export default LoggedOutHomePage;
