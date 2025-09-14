import React from 'react';
import useAuth from "./useAuth"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isLoading: isAdminLoadin } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            // console.log(res.data);
            return res.data?.admin;
        },
        // enabled: !!user?.email
    })
    return [isAdmin, isAdminLoadin]
};

export default useAdmin;