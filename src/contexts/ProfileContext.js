import React, { createContext, useContext, useState, useCallback } from 'react';
import { axiosReq } from '../api/axiosDefaults';

const ProfileContext = createContext();
const SetProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);
export const useSetProfile = () => useContext(SetProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    const fetchProfileData = useCallback(async (id) => {
        setLoading(true);
        try {
            const { data } = await axiosReq.get(`/profiles/${id}/`);
            setProfileData(data);
            setErrors({});
        } catch (err) {
            console.error('Error fetching profile data:', err.response || err.message);
            setErrors(err.response?.data || { message: 'Something went wrong. Please try again later.' });
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <ProfileContext.Provider value={profileData}>
            <SetProfileContext.Provider value={{ fetchProfileData, setProfileData, loading, errors }}>
                {children}
            </SetProfileContext.Provider>
        </ProfileContext.Provider>
    );
};
