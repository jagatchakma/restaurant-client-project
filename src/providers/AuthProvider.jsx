import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user) {
                // todo:
                const userInfo = {email : user.email};
                axiosPublic.post("/jwt", userInfo)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.token) {
                        localStorage.setItem("access-token", res.data.token);
                        setLoading(false);
                    }
                })
            } else {
                // todo: remove action token
                localStorage.removeItem("access-token");
                setLoading(false);
            }
            
        });
        return () => unsubscribe();
    }, [axiosPublic]);

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser);
    //         currentloginUser = currentUser;
    //         console.log('Current User (observer current user):', currentUser);
    //         setLoading(false);
    //     });
    //     return () => {
    //         return unsubscribe(); // Clean up the subscription on unmount
    //     }
    // }, []);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     setUser(userCredential.user);
        // })
        // .catch((error) => {
        //     console.error("Error creating user:", error);
        // })
        // .finally(() => {
        //     setLoading(false);
        // });
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        //     setUser(userCredential.user);
        // })
        // .catch((error) => {
        //     console.error("Error logging in user:", error);
        // })
        // .finally(() => {
        //     setLoading(false);
        // });
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logoutUser = () => {
        setLoading(true);
        return auth.signOut()
        // return signOut(auth); 
        // .then(() => {
        //     setUser(null);
        // })
        // .catch((error) => {
        //     console.error("Error logging out user:", error);
        // })
        // .finally(() => {
        //     setLoading(false);
        // });
    }

    const updateUserProfile = (name, photoUrl) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
        })
    }

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        logoutUser,
        updateUserProfile,
        googleSignIn,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;