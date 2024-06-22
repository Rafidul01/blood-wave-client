import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PublishedBlogCard from "./PublishedBlogCard";

const Blogs = () => {
    const axiosPublic = useAxiosPublic();
    const {
        data: blogs,
        refetch,
      } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/blogs?status=published`);
          return res.data;
        },
      });

      console.log(blogs);
    return (
        <div className="container mx-auto mt-20 font-lato">

            <h1 className="text-center text-3xl text-blood ">Blogs</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    blogs?.map(blog => <PublishedBlogCard key={blog._id} blog={blog}/>)
                }
            </div>
            
            
        </div>
    );
};

export default Blogs;