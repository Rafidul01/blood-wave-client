import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import axios from "axios";
import { ClimbingBoxLoader } from "react-spinners";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const { user, setUpdate, update } = useAuth();
  const { email } = user;
  const [dist, setDist] = useState();
  const [disable, setDisable] = useState(true);
  // console.log(user?.email);
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const { data: currentUser = [], isPending: currentUserPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${email}`);
      setDist(res.data.district);
      console.log(dist);
      return res.data;
    },
  });
  // if(user?.email){
  //     console.log("ay vai ??", user.email)
  //     userRefetch();
  // }

  console.log("currentUser:", currentUser, " dist : ", dist);
  const { data: districts = [] } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await axiosPublic.get("/districts");
      return res.data;
    },
  });
  const {
    data: upazilas = [],
    refetch,
    isPending: upazilasPending,
  } = useQuery({
    queryKey: ["upazilas"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/upazilas?id=${watch("district") || currentUser?.district}`
      );
      return res.data;
    },
  });

  const {
    data: dDist = {},
    isPending: dDistPending,
    refetch: dDistRefetch,
  } = useQuery({
    queryKey: ["dDist"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/districts/${currentUser?.district}`);
      return res.data;
    },
  });

  console.log(dDist);

  useEffect(
    () => {
      setDist(watch("district"));
      refetch();
    },
    [watch("district")],
    dist
  );

  const onSubmit = async (data) => {
    console.log(data);
    if (data.profilePicture.length === 0) {
      updateProfile(user, {
        displayName: data.name,
        // photoURL: res.data.data.display_url || user?.photoURL,
      })
        .then(() => {
          setUpdate(!update);
          const userInfo = {
            name: data.name || currentUser?.displayName,
            email: data.email || currentUser?.email,
            district: data.district || currentUser?.district,
            upazila: data.upazila || currentUser?.upazila,
            // image: res.data.data.display_url || user?.photoURL,
            image: user?.photoURL,
            bloodGroup: data.bloodGroup || currentUser?.bloodGroup,
          };
          axiosPublic
            .patch(`/users?email=${email}`, userInfo)
            .then((res) => {
              console.log(res.data);
              if (res.data.acknowledged) {
                setDisable(!disable);
                toast.success("Updated Successful!");
              }
              // console.log(res);
            })
            .catch();
        })
        .catch();

      return;
    }
    const imageFile = { image: data.profilePicture[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    updateProfile(user, {
      displayName: data.name,
      photoURL: res.data.data.display_url,
    })
      .then(() => {
        setUpdate(!update);
        const userInfo = {
          name: data.name || currentUser?.displayName,
          email: data.email || currentUser?.email,
          district: data.district || currentUser?.district,
          upazila: data.upazila || currentUser?.upazila,
          image: res.data.data.display_url || user?.photoURL,
          bloodGroup: data.bloodGroup || currentUser?.bloodGroup,
        };
        axiosPublic
          .patch(`/users?email=${email}`, userInfo)
          .then((res) => {
            console.log(res.data);
            if (res.data.acknowledged) {
              setDisable(!disable);
              
              toast.success("Updated Successful!");
            }
            // console.log(res);
          })
          .catch();
      })
      .catch();

    // const res = await axiosPublic.patch(`/users?email=${email}`, data);
  };

  if (currentUserPending || dDistPending || upazilasPending) {
    return <div className='flex justify-center  items-center min-h-[calc(100vh-260.8px)]'>
            <ClimbingBoxLoader color="#730000" />
        </div>
  } else {
    dDistRefetch();
    refetch();
  }

  return (
    <div className="md:p-16">
      <div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-blood ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} />
            </div>
          </div>
          <button
            className={`btn ${!disable ? "hidden" : "bg-blood text-white"}`}
            onClick={() => {
              setDisable(!disable);
              reset();
            }}
          >
            {" "}
            <FaEdit></FaEdit>Edit
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              defaultValue={currentUser?.name}
              placeholder={currentUser?.name}
              {...register("name")}
              className="input input-bordered"
              disabled={disable}
            />
          </div>
          <div className=" flex gap-4 justify-between ">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Change Profile picture</span>
              </label>
              <input
                type="file"
                defaultChecked={currentUser?.image}
                {...register("profilePicture")}
                className="file-input w-full max-w-xs file-input-bordered file-input-error"
                disabled={disable}
              />
              {errors.profilePicture && (
                <span className="text-red-500">
                  Profile picture is required
                </span>
              )}
            </div>

            <div className="form-control w-1/2 ">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select
                defaultValue={currentUser?.bloodGroup}
                {...register("bloodGroup")}
                className="select select-bordered w-full "
                disabled={disable}
              >
                <option value={currentUser?.bloodGroup}>
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
                <span className="text-red-500">Blood group is required</span>
              )}
            </div>
          </div>
          <div className="flex gap-4 justify-between">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">District</span>
              </label>
              <select
                defaultValue={currentUser?.district}
                {...register("district")}
                className="select select-bordered w-full "
                disabled={disable}
              >
                <option value={currentUser?.district}> {dDist?.name} </option>
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
                defaultValue={currentUser?.upazila}
                {...register("upazila")}
                className="select select-bordered w-full "
                disabled={disable}
              >
                <option value={currentUser?.upazila}>
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
              disabled={true}
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          <div className="form-control mt-6">
            <button
              className={`btn btn-primary bg-error border-none text-white hover:bg-blood ${
                disable ? "hidden" : ""
              }`}
            >
              save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
