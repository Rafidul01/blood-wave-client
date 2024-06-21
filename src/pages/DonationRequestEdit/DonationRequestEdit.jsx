import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
const DonationRequestEdit = () => {
    const {id} = useParams();
  const {
    register,
    handleSubmit,
    watch,
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

  const { data: request = [] , refetch: refetchRequest } = useQuery({
    queryKey: ["request"],  
    queryFn: async () => {
      const res = await axiosPrivate.get(`/request/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    console.log(watch("district").split(",")[0]);
    refetch();
  }, [watch("district"), refetch, watch]);

  const onSubmit = (data) => {
    // console.log(data);
    const requestData = {
      recipientName: data.recipientName || request.recipientName,
      district: data.district.split(",")[1] || request.district,
      hospitalName: data.hospitalName || request.hospitalName,
      fullAddress: data.fullAddress || request.fullAddress,
      upazila: data.upazila || request.upazila,
      date: data.date || request.date,
      time: data.time || request.time,
      requestMessage: data.requestMessage || request.requestMessage,

    }


    axiosPrivate
      .patch(`/request/${id}`, requestData)
      .then((res) => {
        if (res.data.acknowledged) {
            refetchRequest();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Request Edited Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
              defaultValue={request.requesterName}
              placeholder={request.requesterName}
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
              defaultValue={request.requesterEmail}
              placeholder={request.requesterEmail}
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
            {...register("recipientName", )}
            type="text"
            defaultValue={request.recipientName}
            placeholder={request.recipientName}
            className="input input-bordered"
          />

          

        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              defaultValue={[0, request.district]}
              {...register("district", { required: true })}
              className="select select-bordered w-full "
            >
              <option value={[0, request.district]}>{request.district}</option>
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
              defaultValue={request.upazila}
              {...register("upazila")}
              className="select select-bordered w-full "
            >
              <option value={request.upazila}>
                {request.upazila}
                
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
            defaultValue={request.hospitalName}
            placeholder={request.hospitalName}
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
            defaultValue={request.fullAddress}
            placeholder={request.fullAddress}
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
              defaultValue={request.date}
              placeholder={request.date}
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
              defaultValue={request.time}
              placeholder={request.time}
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
            defaultValue={request.requestMessage}

            className="textarea textarea-bordered h-24"
            placeholder={request.requestMessage}
          ></textarea>

          {errors.requestMessage && (
            <span className="text-red-500">Request message is required</span>
          )}
          
        </label>

        <div className="form-control mt-6">
          <button className="btn btn-error text-white ">Update Donation Request</button>
        </div>
      </form>
    </div>
    );
};

export default DonationRequestEdit;