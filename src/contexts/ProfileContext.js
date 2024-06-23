import React, { createContext, useContext, useState, useCallback } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';

const ProfileContext = createContext();
const SetProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);
export const useSetProfile = () => useContext(SetProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [notFound, setNotFound] = useState(false);

    const handleFollow = async (clickedProfile) => {
        try {
            const { data } = await axiosRes.post('/followers/', {
                followed: clickedProfile.id
            });
            setProfileData((prevData) => ({
                ...prevData,
                followers_count: prevData.followers_count + 1,
                following_id: data.id
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const handleUnfollow = async (clickedProfile) => {
        try {
            await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
            setProfileData((prevData) => ({
                ...prevData,
                followers_count: prevData.followers_count - 1,
                following_id: null
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const fetchProfileData = useCallback(async (id) => {
        setLoading(true);
        setNotFound(false);
        try {
            const { data } = await axiosReq.get(`/profiles/${id}/`);
            setProfileData(data);
            setErrors({});
        } catch (err) {
            if (err.response?.status === 404) {
                setNotFound(true);
            } else {
                console.error('Error fetching profile data:', err.response || err.message);
                setErrors(err.response?.data || { message: 'Something went wrong. Please try again later.' });
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <ProfileContext.Provider value={profileData}>
            <SetProfileContext.Provider value={{ fetchProfileData, handleFollow, handleUnfollow, loading, errors, notFound }}>
                {children}
            </SetProfileContext.Provider>
        </ProfileContext.Provider>
    );
};
