import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../Providers/AuthProviders';
const useApply = () => {
    const {user} = useContext(AuthContext);
    const { refetch, data: apply = [] } = useQuery({
        queryKey: ['apply', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/apply?email=${user?.email}`)
            return res.json();
        },
    })
    return [apply, refetch];
};

export default useApply;