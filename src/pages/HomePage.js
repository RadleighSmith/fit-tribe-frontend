import React from 'react';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import LoggedInHomePage from '../components/LoggedInHomePage';
import LoggedOutHomePage from '../components/LoggedOutHomePage';


const HomePage = () => {
    const currentUser = useCurrentUser();

    return (
        <div>
            {currentUser ? <LoggedInHomePage /> : <LoggedOutHomePage />}
        </div>
    );
};

export default HomePage;