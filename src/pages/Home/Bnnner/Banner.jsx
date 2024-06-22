import { Link } from "react-router-dom";
import bannerImg from "../../../assets/image/banner.jpg"
const Banner = () => {
    return (
        <div className="hero h-[calc(100vh-80px)] mt-20 font-lato" style={{backgroundImage: `url(${bannerImg})`}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content  text-neutral-content">
          <div className="max-w-[600px] ">
            <h1 className="mb-5 text-5xl font-bold">Welcome to <span className="text-blood">Blood</span> Wave</h1>
            <p className="mb-5">Become a donor and help save lives...</p>
            <Link to={"/register"} className="btn bg-blood text-white border-none mr-4">Join as a Donor</Link>
            <Link to={"/search-donor"} className="btn bg-blood border-none text-white">Search Donor</Link>
          </div>
        </div>
      </div>
    );
};

export default Banner;