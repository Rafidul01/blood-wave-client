import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { data: requestData , refetch} = useQuery({
    queryKey: ["donationRequest"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/request/${id}`);
      return res.data;
    },
  });

  const handleStatus = () => {
    console.log("clicked");
    const donorInfo = {
      donorName: user?.displayName,
      donorEmail: user?.email,
      status: "inprogress",
    }

    axiosPrivate
      .patch(`/request/${id}`, donorInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {

          refetch();
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Request Accepted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(requestData);
  return (
    <div className=" container mx-auto mt-32 card w-full bg-base-100 shadow-xl font-lato">
      <div className="relative">
        <h1 className="card-title flex justify-center text-3xl text-blood">
          Blood Donation Request Details
        </h1>
        <hr className="m-4 border-blood" />
        <div className="h-7 w-36 bg-blood absolute flex top-[52px] left-1/2 rounded-b-lg -translate-x-1/2 justify-center items-center text-white">
          {" "}
          <h1 className="text-center uppercase">{requestData?.status}</h1>
        </div>
      </div>

      <div className="card-body ">
        <h1 className="text-xl text-center pb-4 border-b border-b-blood">
          <span className="font-bold text-blood">Recipient Name:</span>{" "}
          {requestData?.recipientName}
        </h1>
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-lg">
            <span className="font-bold text-blood">Requester Name:</span>{" "}
            {requestData?.requesterName}
          </h1>
          <h1 className="text-lg">
            <span className="font-bold text-blood">Requester Email:</span>{" "}
            {requestData?.requesterEmail}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-lg">
            <span className="font-bold text-blood">Recipient District:</span>{" "}
            {requestData?.district}
          </h1>
          <h1 className="text-lg">
            <span className="font-bold text-blood">Recipient Upazila:</span>{" "}
            {requestData?.upazila}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-lg">
            <span className="font-bold text-blood">Hospital Name:</span>{" "}
            {requestData?.hospitalName}
          </h1>
          <h1 className="text-lg">
            <span className="font-bold text-blood">Full Address:</span>{" "}
            {requestData?.fullAddress}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-lg">
            <span className="font-bold text-blood">Date:</span>{" "}
            {requestData?.date} (yy-mm-dd)
          </h1>
          <h1 className="text-lg">
            <span className="font-bold text-blood">Time:</span>{" "}
            {requestData?.time} (24h)
          </h1>
        </div>
        <hr className="m-4 border-blood" />

        <h1 className="text-lg text-center">
          <span className="font-bold text-blood">Request Massage:</span>{" "}
          {requestData?.requestMessage}
        </h1>

        {/* The button to open modal */}
        <a
          href="#my_modal_8"
          className="btn bg-transparent border-blood text-blood text-bold w-full mt-3 hover:bg-blood hover:text-white"
        >
          Donate
        </a>
        {/* Put this part before </body> tag */}
        <div className="modal" role="dialog" id="my_modal_8">
          <div className="modal-box">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donor Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName}
                  placeholder={user?.displayName}
                  className="input input-bordered"
                  disabled
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donor Email</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.email}
                  placeholder={user?.email}
                  className="input input-bordered"
                  disabled
                />
                
              </div>
              
            </form>

            <div className="modal-action ">
              <a onClick={handleStatus} href="#" className="btn bg-transparent border-blood text-blood text-bold w-full mt-3 hover:bg-blood hover:text-white">
                Confirm Donation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
