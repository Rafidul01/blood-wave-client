import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useVolunteer = () => {
    const {user} =useAuth();
    const axiosPrivate = useAxiosPrivate();
    const {data: isVolunteer , isPending: isVolunteerLoading} = useQuery({
        queryKey: [user?.email, 'isVolunteer'],
        queryFn: async ()=>{
            const res = await axiosPrivate.get(`/users/volunteer/${user.email}`);
            return res.data?.volunteer;
        }
    })
    return [isVolunteer ,isVolunteerLoading]
};

export default useVolunteer;