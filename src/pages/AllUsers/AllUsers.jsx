import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosPrivate = useAxiosPrivate();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const res = await axiosPrivate.get("/all-users");
          console.log(res.data);
          return res.data;
        },
      });

      const handleRole = (id, role) => {
        console.log(id);
        const userInfo = {
          role: role,
        }
        axiosPrivate.patch(`/users/admin/${id}`, userInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Role Updated to ${role}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };
      const handleBlock = (id, stat) => {
        console.log(id);
        const userInfo = {
          status: stat,
        }
        axiosPrivate.patch(`/users/admin/${id}`, userInfo).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `User is now ${stat}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      };
      console.log(users);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Status</th>
              <th>Unblock</th>
              <th>Make volunteer</th>
              <th>Make Admin</th>
              
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {
                users?.map(user => <tr key={user._id}>
                    <td>
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img
                                    src={user.image}
                                    alt="Avatar Tailwind CSS Component"
                                />
                            </div>
                        </div>
                    </td>
                    <td>
                        {user.name}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td>{user.status === "active" ? <button onClick={() => handleBlock(user._id, "blocked")} className="btn btn-sm btn-success">Block</button> : <button onClick={() => handleBlock(user._id, "active")} className="btn btn-sm btn-success">Unblock</button>}</td>
                    <td><button onClick={() => handleRole(user._id, "volunteer")} className="btn btn-sm btn-success">Make volunteer</button></td>
                    <td><button onClick={() => handleRole(user._id, "admin")} className="btn btn-sm btn-success">Make Admin</button></td>

                </tr>)
            }
            
          
          </tbody>
          
          
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
