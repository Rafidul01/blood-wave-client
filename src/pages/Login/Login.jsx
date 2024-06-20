import { useForm } from "react-hook-form";
import img from "../../assets/image/register.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [eye, setEye] = useState(false);
  const { logIn } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    logIn(data.email, data.Password)
    .then((result) => {
      console.log(result.user);
      toast.success("Login Successful!")
      navigate(location?.state ? location.state : '/');
    })
    .catch((error) => {
      console.log(error);
      toast.error("login failed..")
    });
    // console.log(res.data);
    // console.log(res);
  };
  const handelSeePass = () => {
    setEye(!eye);
  };
  return (
    <div>
      <div className="hero min-h-screen mt-20 ">
        <div className="hero-content flex-col">
          <div className="card lg:card-side bg-base-100  shadow-xl h-[650px]">
            <figure className="object-contain object-center lg:w-1/2">
              <img src={img} alt="Album" />
            </figure>
            <div className="card-body lg:w-1/2 p-4 ">
              <form onSubmit={handleSubmit(onSubmit)} className="">
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
                <div className="form-control mt-6">
                  <button className="btn btn-primary bg-error border-none text-white hover:bg-blood">
                    Login
                  </button>
                </div>
              </form>
              <p className="text-center">
                Don&apos;t have an account?
                <Link className="text-error" to="/register">
                  {" "}
                  Register{" "}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
