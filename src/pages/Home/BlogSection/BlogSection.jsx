import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PublishedBlogCard from "../../Blogs/PublishedBlogCard";
import { Link } from "react-router-dom";

const BlogSection = () => {
    const axiosPublic = useAxiosPublic();
    const {
        data: blogs,
      } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/blogs?status=published`);
          return res.data;
        },
      });

      console.log(blogs);
    return (
        <div>

<div className="hero mt-16">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <hr className="border-blood" />
            <h1 className="text-5xl font-bold text-blood my-4">Blogs</h1>
            <hr className="border-blood" />
          </div>
        </div>
      </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    blogs?.slice(0, 6).map(blog => <PublishedBlogCard key={blog._id} blog={blog}/>)
                }
            </div>

            <Link to={'/blog'} className="btn bg-blood text-white mt-4 w-full">View All</Link>
            
        </div>
    );
};

export default BlogSection;