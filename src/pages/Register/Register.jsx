import { useForm } from "react-hook-form";
import img from "../../assets/image/register.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Register = () => {
  const { createUser, setUpdate, update } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [eyeTwo, setEyeTwo] = useState(false);

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

  // console.log(upazilas);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.profilePicture[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if(data.Password !== data.confirmPassword){
      toast.error("Password didn't match");
      return;
    }

    createUser(data.email, data.Password)
      .then((result) => {
        console.log(result.user);
        updateProfile(result.user, {
          displayName: data.name,
          photoURL: res.data.data.display_url,
        })
          .then(() => {
            setUpdate(!update);
            const userInfo = {
              name: data.name,
              email: data.email,
              district: data.district,
              upazila: data.upazila,
              image: res.data.data.display_url,
              bloodGroup: data.bloodGroup,
              role: "donor",
              status: "active",
            };
            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                  navigate(location?.state ? location.state : "/");
                  toast.success("Registered Successful!");
                }
                // console.log(res);
              })
              .catch();
          })
          .catch();
        //reset the form
      })
      .catch((error) => {
        console.error(error);
        toast.error("Sign Up Failed!");
      });

    // console.log(res.data);
    // console.log(res);
  };
  // console.log(watch("district"));
  useEffect(() => {
    refetch();
  }, [watch("district")]);
  const handelSeePass = () => {
    setEye(!eye);
  };
  const handelSeePassTwo = () => {
    setEyeTwo(!eyeTwo);
  };
  return (
    <div>
      <div className="hero min-h-screen mt-20 ">
        <div className="hero-content flex-col">
          <div className="card lg:card-side bg-base-100  shadow-xl h-[650px]">
            <figure className="object-contain object-center lg:w-1/2">
              <img src={img} alt="Album" />
            </figure>
            <div className="card-body lg:w-1/2 p-4">
              <form onSubmit={handleSubmit(onSubmit)} className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    {...register("name", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>
                <div className="flex gap-4 justify-between">
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">profile picture</span>
                    </label>
                    <input
                      type="file"
                      {...register("profilePicture", { required: true })}
                      className="file-input w-full max-w-xs file-input-bordered file-input-error"
                    />
                    {errors.profilePicture && (
                      <span className="text-red-500">
                        Profile picture is required
                      </span>
                    )}
                  </div>
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Blood Group</span>
                    </label>
                    <select
                      defaultValue={"Selected Blood Group"}
                      {...register("bloodGroup", { required: true })}
                      className="select select-bordered w-full "
                    >
                      <option value="Selected Blood Group">
                        Select Blood Group
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
                  <div className="form-control w-1/2">
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
                        <option key={upazila._id} value={upazila.id}>
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
                    placeholder="email"
                    {...register("email", { required: true })}
                    className="input input-bordered"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={eye ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    {...register("Password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                    })}
                    className="input input-bordered"
                  />
                  {errors.Password?.type === "required" && (
                    <span className="text-red-500">Password is required</span>
                  )}
                  {errors.Password?.type === "minLength" && (
                    <span className="text-red-500">
                      Password must be 6 characters
                    </span>
                  )}
                  {errors.Password?.type === "maxLength" && (
                    <span className="text-red-500">
                      Password must be less than 20 characters
                    </span>
                  )}
                  {errors.Password?.type === "pattern" && (
                    <span className="text-red-500">
                      Password must have at least one uppercase, one lowercase,
                      one number and one special character
                    </span>
                  )}

                  <Link
                    onClick={handelSeePass}
                    className="text-2xl absolute right-3 top-[48px]"
                  >
                    {eye ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Link>
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type={eyeTwo ? "text" : "password"}
                    name="password"
                    placeholder="Confirm password"
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                    })}
                    className="input input-bordered"
                  />
                  {errors.confirmPassword?.type === "required" && (
                    <span className="text-red-500">Password is required</span>
                  )}
                  {errors.confirmPassword?.type === "minLength" && (
                    <span className="text-red-500">
                      Password must be 6 characters
                    </span>
                  )}
                  {errors.confirmPassword?.type === "maxLength" && (
                    <span className="text-red-500">
                      Password must be less than or equal to 20 characters{" "}
                    </span>
                  )}
                  {errors.confirmPassword?.type === "pattern" && (
                    <span className="text-red-500">
                      Password must be at least one uppercase, one lowercase,
                      one number and one special character
                    </span>
                  )}
                  <Link
                    onClick={handelSeePassTwo}
                    className="text-2xl absolute right-3 top-[48px]"
                  >
                    {eyeTwo ? <FaRegEye /> : <FaRegEyeSlash />}
                  </Link>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary bg-error border-none text-white hover:bg-blood">
                    Register
                  </button>
                </div>
              </form>
              <p className="text-center">
                Already have an account?{" "}
                <Link className="text-error" to="/login">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
