import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { CiViewList } from "react-icons/ci";
import { Link } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";

const BloodDonationRequests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: donorRequests = [], isPending } = useQuery({
    queryKey: ["donorRequests"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-requests?status=pending`);
      return res.data;
    },
  });

  console.log(donorRequests);

  if (isPending) {
    return (
      <div className="flex justify-center  items-center min-h-[calc(100vh-260.8px)]">
        <ClimbingBoxLoader color="#730000" />
      </div>
    );
  }

  return (
    <div className="mt-20 container mx-auto">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
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

export default BloodDonationRequests;
