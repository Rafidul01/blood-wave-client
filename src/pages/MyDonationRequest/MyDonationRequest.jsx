import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import Swal from "sweetalert2";

const MyDonationRequest = () => {
  const { user } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [filter, setFilter] = useState("");

  const { data: donorRequests = [], isPending, refetch } = useQuery({
    queryKey: ["donorRequests"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/requests?email=${user?.email}&status=${filter}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  const handleFilter = (e) => {

    const status = e.target.value;
    setFilter(status);
    
  };

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
    return <div>Loading...</div>;
  }
  return (
    <div className="font-lato  text-center ">
      <select onChange={handleFilter} defaultValue={0} className="select select-secondary focus:outline-blood  focus:border-blood w-full max-w-xs uppercase my-4 md:my-8 border-blood text-blood">
        <option disabled value={0}>
          Filter By Status
        </option>
        <option>pending</option>
        <option>inprogress</option>
        <option>done</option>
        <option>canceled</option>
       
      </select>

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
            {donorRequests
              .slice(0, donorRequests.length)
              .map((donorRequest) => (
                <tr key={donorRequest._id}>
                  <td>{donorRequest.recipientName}</td>
                  <td>{donorRequest.district + ", " + donorRequest.upazila}</td>
                  <td>{donorRequest.date}</td>
                  <td>{donorRequest.time}</td>
                  <td
                    className={`${
                      donorRequest.status === "pending"
                        ? "text-warning"
                        : donorRequest.status === "done"
                        ? "text-success"
                        : donorRequest.status === "canceled"
                        ? "text-error"
                        : donorRequest.status === "inprogress"
                        ? "text-info"
                        : ""
                    } uppercase font-bold`}
                  >
                    {donorRequest.status}
                    
                  </td>
                  <td className="text-center">
                    {donorRequest.status === "inprogress" ? <>
                    <button onClick={() => handleStatus(donorRequest._id, "done")} className="text-success text-xl"> <TiTick></TiTick> </button> <br />
                    <button onClick={() => handleStatus(donorRequest._id, "canceled")} className="text-error text-xl"> <ImCancelCircle></ImCancelCircle> </button>
                    </> : ""}
                  </td>
                  <td>  {donorRequest.status === "pending" ? "N/A" : <>
                    Name: {donorRequest.donorName} <br />
                    Email: {donorRequest.donorEmail}
                  </>}</td>
                  <td>
                    <button className="btn btn-sm bg-error text-white">
                      {" "}
                      <FaEdit></FaEdit>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(donorRequest._id)} className="btn btn-sm text-error bg-transparent border-none shadow-none">
                      <FaTrash></FaTrash>
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/donation-request-details/${donorRequest._id}`}
                      className="btn btn-sm bg-error text-white "
                    >
                      <CiViewList></CiViewList>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonationRequest;
