import { Link } from "react-router-dom";
import BlogCard from "../Shared/BlogCard/BlogCard";
import useAdmin from "../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const ContentManagement = () => {
  const [isAdmin] = useAdmin();
  const axiosPrivate = useAxiosPrivate();
  const [filter, setFilter] = useState("");

  const {
    data: blogs,
    refetch,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/blogs?status=${filter}`);
      return res.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  const handleStatus = (id, status) => {
    const blogInfo = {
      status,
    };
    axiosPrivate.patch(`/blogs/${id}`, blogInfo).then((res) => {
      if (res.data.acknowledged) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Blog status updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  

  const handleFilter = (e) => {
  
    const status = e.target.value;
    setFilter(status);
    refetch();

    
  };

  const handleDelete = (id) => {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosPrivate.delete(`/blogs/${id}`).then((res) => {
                if (res.data.acknowledged) {
                  refetch();
                  Swal.fire({
                    title: "Deleted!",
                    text: "Blog deleted Successfully",
                    icon: "success"
                  });
                }
              });
         
        }
      });
    
  };

  console.log(blogs);

  return (
    <div className="container mx-auto">
      <Link
        to={"/dashboard/add-blog"}
        className="btn bg-blood text-white w-full"
      >
        Add Blog
      </Link>

      <div className="flex justify-center">
      <select
        onChange={handleFilter}
        defaultValue={0}
        className="select select-secondary focus:outline-blood  focus:border-blood w-full max-w-xs uppercase my-4 md:my-8 border-blood text-blood text-center  "
      >
        <option disabled value={0}>
          Filter By Status
        </option>
        <option>draft</option>
        <option>published</option>
        <option value={""}>any</option>
      
      </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        {blogs?.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            isAdmin={isAdmin}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentManagement;
