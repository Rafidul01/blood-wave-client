import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
const CreateDonationRequest = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosPrivate = useAxiosPrivate();
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
      const res = await axiosPublic.get(
        `/upazilas?id=${watch("district").split(",")[0]}`
      );
      return res.data;
    },
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user?.email}`);
      return res.data;
    },
  }); 

  useEffect(() => {
    console.log(watch("district").split(",")[0]);
    refetch();
  }, [watch("district"), refetch, watch]);


  const onSubmit = (data) => {

    if(currentUser?.status === "blocked"){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have been blocked by admin!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
      return;
    }
    // console.log(data);
    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      district: data.district.split(",")[1],
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      upazila: data.upazila,
      date: data.date,
      time: data.time,
      requestMessage: data.requestMessage,
      status: "pending",

    }


    axiosPrivate.post("/requests", requestData).then((res) => {
      if (res.data.acknowledged) {
        reset();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Request Submitted Successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });

    console.log(requestData);

  };
  return (
    <div className="font-lato">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        {/* requester info */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              {...register("requesterName")}
              type="text"
              defaultValue={user.displayName}
              placeholder={user.displayName}
              className="input input-bordered"
              disabled
            />
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              {...register("requesterEmail")}
              type="email"
              defaultValue={user.email}
              placeholder={user.email}
              className="input input-bordered"
              disabled
            />
          </div>
        </div>

        {/* recipient info */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Recipient Name</span>
          </label>
          <input
            {...register("recipientName", { required: true })}
            type="text"
            placeholder="Recipient name"
            className="input input-bordered"
          />

          {errors.recipientName && (
            <span className="text-red-500">Recipient name is required</span>
          )}

        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              defaultValue={"Selected district"}
              {...register("district", { required: true })}
              className="select select-bordered w-full "
            >
              <option value="Selected district">Select district</option>
              {districts?.map((district) => (
                <option key={district._id} value={[district.id, district.name]}>
                  {district.name}
                </option>
              ))}
            </select>

            {errors.district && (
              <span className="text-red-500">District is required</span>
            )}
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Upazila</span>
            </label>
            <select
              defaultValue={"Selected Upazila"}
              {...register("upazila", { required: true })}
              className="select select-bordered w-full "
            >
              <option value="Selected Upazila">
                {watch("district") === "Selected district"
                  ? "Select district first"
                  : "Select Upazila"}
              </option>
              {upazilas?.map((upazila) => (
                <option key={upazila._id} value={upazila.zzz}>
                  {upazila.name}
                </option>
              ))}
            </select>

            {errors.upazila && (  
              <span className="text-red-500">Upazila is required</span> 
            )}
          </div>
        </div>
        {/* hospital info */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Hospital Name</span>
          </label>
          <input
            {...register("hospitalName", { required: true })}
            type="text"
            placeholder="Hospital name"
            className="input input-bordered"
          />

          {errors.hospitalName && (
            <span className="text-red-500">Hospital name is required</span>
          )}
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Full Address</span>
          </label>
          <input
            {...register("fullAddress", { required: true })}
            type="text"
            placeholder="Full address of the hospital"
            className="input input-bordered"
          />

          {errors.fullAddress && (
            <span className="text-red-500">Full address is required</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 ">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              placeholder="Full address of the hospital"
              className="input input-bordered"
            />
            
            {errors.date && (
              <span className="text-red-500">Date is required</span>
            )}
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">time</span>
            </label>
            <input
              {...register("time", { required: true })}
              type="time"
              placeholder="Full address of the hospital"
              className="input input-bordered"
            />

            {errors.time && (
              <span className="text-red-500">time is required</span>
            )}
          </div>
        </div>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Request Message</span>
          </div>
          <textarea
            {...register("requestMessage")}
            className="textarea textarea-bordered h-24"
            placeholder="Write your request message  "
          ></textarea>

          {errors.requestMessage && (
            <span className="text-red-500">Request message is required</span>
          )}
          
        </label>

        <div className="form-control mt-6">
          <button className="btn btn-error text-white ">Request</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
