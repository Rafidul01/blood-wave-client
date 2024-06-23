import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

const Funding = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data: funding, isPending } = useQuery({
    queryKey: ["funding"],
    queryFn: async () => {
      const res = await axiosPrivate.get("/payments");
      return res.data;
    },
  })

  if(isPending) return <div>Loading...</div>

  console.log(funding);

  return (
    <div className="min-h-[calc(100vh-298px)] container mx-auto">
      <div className=" pt-20 text-center">
        <Link to="/funding" className="btn bg-blood border-none text-white text-center">
          Give Funding
        </Link>

        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>

              {
                funding.map((funding) => (
                  <tr key={funding._id}>
                    <td>{funding.name}</td>
                    <td>{funding.price}</td>
                    <td>{funding.date}</td>
                  </tr>
                ))
              }
              
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Funding;
