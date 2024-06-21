import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const { data: currentUser = [] } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/users?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: donorRequests = [], isPending, refetch } = useQuery({
    queryKey: ["donorRequests"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/requests?email=${user?.email}`);
      // console.log(res.data);
      return res.data;
    },
  });

  const handleStatus = (id, status) => {
    const donorInfo = {
      status
    }

    axiosPrivate.patch(`/request/${id}`, donorInfo).then((res) => {
      if (res.data.acknowledged) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Donation status updated Successfully",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })

  }
  const handleDelete = (id) => {
    axiosPrivate.delete(`/request/${id}`).then((res) => {
      if (res.data.acknowledged) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Donation deleted Successfully",
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      
      <div className="flex justify-center items-center m-16">
        <div>
          <h1 className=" text-xl md:text-3xl  text-blood border-t-2 border-b-2 border-blood">
            Welcome, <span className="uppercase">{currentUser.name}</span>!
          </h1>
        </div>
      </div>

      {currentUser.role === "donor" && (
        <div className="">
          <h1 className=" mt-8 md:text-xl text-blood border-t-2 border-b-2 border-blood text-center">
            Your Recent Donations
          </h1>


          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Recipient Location</th>
                  <th>Donation Date</th>
                  <th>Donation Time</th>
                  <th>Donation Status</th>
                  <th>Done /<br /> Cencle</th>
                  <th>Donor Information</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                  donorRequests.slice(0, 3).map((donorRequest) => (
                    <tr key={donorRequest._id}>
                      
                      <td>{donorRequest.recipientName}</td>
                      <td>{donorRequest.district + ", " + donorRequest.upazila}</td>
                      <td>{donorRequest.date}</td>
                      <td>{donorRequest.time}</td>
                      <td className={`${donorRequest.status === "pending" ? "text-warning" : donorRequest.status === "done" ? "text-success" : donorRequest.status === "canceled" ? "text-error" : donorRequest.status === "inprogress" ? "text-info" : ""} uppercase font-bold`} >{donorRequest.status}</td>
                      <td className="text-center">
                    {donorRequest.status === "inprogress" ? <>
                    <button onClick={() => handleStatus(donorRequest._id, "done")} className="text-success text-xl"> <TiTick></TiTick> </button> <br />
                    <button onClick={() => handleStatus(donorRequest._id, "canceled")} className="text-error text-xl"> <ImCancelCircle></ImCancelCircle> </button>
                    </> : ""}
                  </td>
                      <td>{donorRequest.donorInformation || "N/A"}</td>
                      <td>
                        <Link to={`/dashboard/donation-request-edit/${donorRequest._id}`}  className="btn btn-sm bg-error text-white"> <FaEdit></FaEdit></Link>
                      </td>
                      <td>
                        <button onClick={() => handleDelete(donorRequest._id)}  className="btn btn-sm text-error bg-transparent border-none shadow-none"><FaTrash></FaTrash></button>
                      </td>
                      <td>
                        <Link to={`/donation-request-details/${donorRequest._id}`} className="btn btn-sm bg-error text-white "><CiViewList></CiViewList></Link>
                      </td>
                    </tr>
                  ))
                }
                
                
              </tbody>
            </table>

            
          </div>
          <div className="text-center mt-8">
                <Link to="/dashboard/my-donation-requests" className="btn btn-sm bg-error text-white">view my all request</Link>
            </div>
        </div>
      )}

      {
        currentUser.role === "donor" && <>

        </>
      }

    </div>
  );
};

export default DashboardHome;
