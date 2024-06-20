import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";

const Profile = () => {
    const { user } = useAuth();
    const { email } = user;
    const [dist, setDist] = useState();
    const [disable , setDisable] = useState(true);
    // console.log(user?.email);
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();
    
    const { data: currentUser = [] } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/users?email=${email}`);
          setDist(res.data.district);
          console.log(dist);
          return res.data;
        },
    })
    // if(user?.email){
    //     console.log("ay vai ??", user.email)
    //     userRefetch();
    // }
    
    console.log("currentUser:",currentUser, " dist : ", dist);
    const { data: districts = [] } = useQuery({
        queryKey: ["districts"],
        queryFn: async () => {
          const res = await axiosPublic.get("/districts");
          return res.data;
        },
      });
      const { data: upazilas = [], refetch } = useQuery({
        queryKey: ["upazilas"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/upazilas?id=${watch("district")}`);
          return res.data;
        },
      });
      useEffect(() => {
        setDist(watch("district"));
        refetch();
      }, [watch("district")]);

  const onSubmit = async (data) => {
    console.log(data);
    

    const res = await axiosPublic.patch(`/users?email=${email}`, data);
}
  
    return (
        <div className="p-16">
            <h1>this is profile</h1>
            <div>
                <div>
                    <button className="btn" onClick={() => {
                        setDisable(!disable);
                        reset();
                        }}> <FaEdit></FaEdit>Edit</button>
                </div>

            <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder={currentUser?.name}
                    {...register("name")}
                    className="input input-bordered"
                    disabled = {disable} 
                  />
                  
                </div>
                <div className="">
                  
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Blood Group</span>
                    </label>
                    <select
                      defaultValue={0}
                      {...register("bloodGroup")}
                      className="select select-bordered w-full "
                      disabled = {disable} 
                    >
                      <option value={0}>
                        {currentUser?.bloodGroup}
                      </option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>O+</option>
                      <option>O-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                    </select>
                    {errors.bloodGroup && (
                      <span className="text-red-500">
                        Blood group is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">District</span>
                    </label>
                    <select
                      defaultValue={"0"}
                      {...register("district")}
                      className="select select-bordered w-full "
                      disabled = {disable} 
                    >
                      <option value="0"> {currentUser?.district} </option>
                      {districts?.map((district) => (
                        <option key={district._id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Upazila</span>
                      
                    </label>
                    <select
                      defaultValue={"Selected Upazila"}
                      {...register("upazila")}
                      className="select select-bordered w-full "
                      disabled = {disable} 
                    >
                      <option value="Selected Upazila">
                        {currentUser?.upazila}
                      </option>
                      {upazilas?.map((upazila) => (
                        <option key={upazila._id} value={upazila.name}>
                          {upazila.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder={currentUser?.email}
                    {...register("email")}
                    className="input input-bordered"
                    disabled = {true}
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>


                <div className="form-control mt-6">
                  <button className={`btn btn-primary bg-error border-none text-white hover:bg-blood ${disable ? "hidden" : ""}`}>
                    save
                  </button>
                </div>
              </form>
            </div>
        </div>
    );
};

export default Profile;