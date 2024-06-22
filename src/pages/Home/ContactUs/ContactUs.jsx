import { FaPhone } from "react-icons/fa";
import image from "../../../assets/image/contact.png";


const ContactUs = () => {
  return (
    <div>




      <div className="container mx-auto border border-blood rounded-2xl mt-16 font-poppins mb-16">
      
      <div className="hero mt-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <hr className="border-blood" />
            <h1 className="text-5xl font-bold text-blood my-4">Contact Us</h1>
            <hr className="border-blood" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row  justify-center items-center p-8  gap-4">
        <div className="md:w-1/2">
          <img
            src={image}
            alt=""
          />
        </div>
        <div className="md:w-1/2 space-y-6">
        <div >
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea className="textarea textarea-bordered" placeholder="Message"></textarea>
                </div>
                
                
                
                <div className="form-control mt-6">
                  <button className="btn bg-blood text-white">Send Message</button>
                </div>

                <hr className="border-blood my-4" />

                <div>
                    <h1 className=" lg:text-lg md:text-sm text-xs flex items-center gap-1 font-bold"> <FaPhone/> Contact Us : +088 123 456 789</h1>
                </div>
              </form>
              
            </div>
        </div>
      </div>
    </div>


    </div>
  );
};

export default ContactUs;
