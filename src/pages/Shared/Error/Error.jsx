import { Link} from "react-router-dom";

const Error = () => {
    return (
        <section className="bg-[url('https://i.ibb.co/mCG9F0V/markus-spiske-Ps-RUMc7vilg-unsplash.jpg')] h-[100vh] w-[100vw] bg-center bg-cover bg-no-repeat font-poppins flex justify-center items-center text-center text-white ">
            <div className="space-y-4" >
                <h1 className="font-bold text-2xl md:text-6xl text-red-500">Error 404</h1>
                <p className="md:text-xl" >You may lost! Go back to home</p>
                <Link to='/' ><button className="btn bg-blood border-none text-white">Home</button></Link>
            </div>
        </section>
    );
};

export default Error;