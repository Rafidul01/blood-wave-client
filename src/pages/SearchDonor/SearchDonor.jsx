import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const SearchDonor = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [donors, setDonors] = useState([]);
  const [message, setMessage] = useState("Search First");

  const axiosPublic = useAxiosPublic();
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
    refetch();
  }, [watch("district")]);

  const onSubmit = (data) => {
    console.log(data);

    axiosPublic
      .get(`/donors`,{
            params: {
              bloodGroup: encodeURIComponent(data.bloodGroup),
              district: encodeURIComponent(data.district),
              upazila: encodeURIComponent(data.upazila),
            }
      })
      .then((res) => {
        console.log(res.data);
        setDonors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

      setMessage("No Donors Found");
    

  }
  console.log(donors , watch("district"));
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body mt-20 ">
        <div className="flex gap-4 justify-around">
          <div className="form-control w-full">
            
            <select
              defaultValue={"Selected Blood Group"}
              {...register("bloodGroup", { required: true })}
              className="select select-bordered w-full "
            >
              <option value="Selected Blood Group">Select Blood Group</option>
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
              <span className="text-red-500">Blood group is required</span>
            )}
          </div>
          <div className="form-control w-full">
            <select
              defaultValue={"Selected district"}
              {...register("district", { required: true })}
              className="select select-bordered w-full "
            >
              <option value="Selected district">Select district</option>
              {districts?.map((district) => (
                <option key={district._id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full">
            <select
              defaultValue={"Selected Upazila"}
              {...register("upazila", { required: true })}
              className="select select-bordered w-full "
            >
              <option value="Selected Upazila">
                {watch("district") === "Selected district"
                  ? "Select district first for Upazila"
                  : "Select Upazila"}
              </option>
              {upazilas?.map((upazila) => (
                <option key={upazila._id} value={upazila.zzz}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn bg-blood text-white">
            {" "}
            Search{" "}
          </button>
        </div>
      </form>

      {donors.length > 0 ? <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Blood Group</th>
              <th>Upazila</th>   
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {
                donors?.map(user => <tr key={user._id}>
                    <td>
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img
                                    src={user.image}
                                    alt="Avatar Tailwind CSS Component"
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.bloodGroup}</td>
                    <td>{user.upazila}</td>
                    
                </tr>)
            }
            
          
          </tbody>
          
          
        </table>
      </div> : <div className="text-center">
        <h1 className="text-3xl font-bold text-red-500">{message}</h1>
      </div>}
    </div>
  );
};

export default SearchDonor;
