import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import parser from "html-react-parser";

const BlogDetails = () => {
    const {id} = useParams();
    const axiosPublic = useAxiosPublic();
    const {data: blog , isPending} = useQuery({
        queryKey: ["blog"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog/${id}`);
            return res.data;
        }
    })
    if(isPending){
        return <h1>Loading...</h1>

    }
    const {content, title, thumbnailImage } = blog;
    console.log(blog);
    return (
        <div className="my-20">
            <div className="card  bg-base-100 shadow-xl font-lato">
    <div className="relative">
      <figure className="px-10 pt-10">
        <img
          src={thumbnailImage}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      
        
      </div>
      <div className="card-body ">
        <h2 className="text-2xl text-center mb-4 text-blood">{title}</h2>

        <div>
            {parser(content)} 
        </div>


         
        
      </div>
      
    </div>
            
        </div>
    );
};

export default BlogDetails;