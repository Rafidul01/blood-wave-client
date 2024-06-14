import { useForm } from "react-hook-form";
import img from "../../assets/image/register.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
const Register = () => {
    const [eye, setEye] = useState(false);
    const [eyeTwo, setEyeTwo] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(watch("district"));
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
                  {errors.name && <span className="text-red-500">Name is required</span>}
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
                    {errors.profilePicture && <span className="text-red-500">Profile picture is required</span>}
                  </div>
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Blood Group</span>
                    </label>
                    <select defaultValue={"Selected Blood Group"} {...register("bloodGroup", { required: true })} className="select select-bordered w-full ">
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
                    {errors.bloodGroup && <span className="text-red-500">Blood group is required</span>}
                  </div>
                </div>
                <div className="flex gap-4 justify-between">
                <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">District</span>
                    </label>
                    <select defaultValue={"Selected district"} {...register("district", { required: true })} className="select select-bordered w-full ">
                      <option value="Selected district">
                        Select district
                      </option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Rajshahi</option>
                      <option>Rangpur</option>
                      <option>Sylhet</option>
                    </select>
                  </div>
                  <div className="form-control w-1/2">
                    <label className="label">
                      <span className="label-text">Upazila</span>
                    </label>
                    <select defaultValue={"Selected Upazila"} {...register("upazila",{ required: true })} className="select select-bordered w-full ">
                      <option value="Selected Upazila">
                        Select Upazila
                      </option>
                      <option>Dhaka</option>
                      <option>Chittagong</option>
                      <option>Rajshahi</option>
                      <option>Rangpur</option>
                      <option>Sylhet</option>
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
                    {...register("email",{ required: true })}
                    className="input input-bordered"
                    
                  />
                  {errors.email && <span className="text-red-500">Email is required</span>}
                </div>
                <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  {...register("Password",{ required: true })}
                  className="input input-bordered"
                  required
                />
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
                  placeholder="password"
                  {...register("confirmPassword",{ required: true })}
                  className="input input-bordered"
                  required
                />
                <Link
                  onClick={handelSeePassTwo}
                  className="text-2xl absolute right-3 top-[48px]"
                >
                  {eyeTwo ? <FaRegEye /> : <FaRegEyeSlash />}
                </Link>
              </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary bg-error border-none text-white hover:bg-blood">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
