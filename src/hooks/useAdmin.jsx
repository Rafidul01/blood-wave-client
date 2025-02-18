import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useAdmin = () => {
    const {user} =useAuth();
    const axiosPrivate = useAxiosPrivate();
    const {data: isAdmin , isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async ()=>{
            const res = await axiosPrivate.get(`/users/admin/${user.email}`);
            return res.data?.admin;
        }
    })
    return [isAdmin ,isAdminLoading]
};

export default useAdmin;