import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const CreateDonationRequest = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosProivate = useAxiosPrivate();
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

  useEffect(() => {
    console.log(watch("district").split(",")[0]);
    refetch();
  }, [watch("district")]);

  const onSubmit = (data) => {
    console.log(data);

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
            {...register("recipientName")}
            type="text"
            defaultValue={"recipientName"}
            placeholder="recipient"
            className="input input-bordered"
          />
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
          </div>
        </div>
        {/* hospital info */}
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Hospital Name</span>
          </label>
          <input
            {...register("hospitalName")}
            type="text"
            placeholder="Hospital name"
            className="input input-bordered"
          />
        </div>
        <div className="form-control ">
          <label className="label">
            <span className="label-text">Full Address</span>
          </label>
          <input
            {...register("fullAddress")}
            type="text"
            placeholder="Full address of the hospital"
            className="input input-bordered"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 ">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              {...register("date")}
              type="date"
              placeholder="Full address of the hospital"
              className="input input-bordered"
            />
          </div>
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">time</span>
            </label>
            <input
              {...register("time")}
              type="time"
              placeholder="Full address of the hospital"
              className="input input-bordered"
            />
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
          
        </label>

        <div className="form-control mt-6">
          <button className="btn btn-error text-white ">Request</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
