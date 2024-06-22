/* eslint-disable react/prop-types */
import parser from "html-react-parser";
import { Link } from "react-router-dom";

const PublishedBlogCard = ({blog}) => {
    const {content, title, thumbnailImage } = blog;
    return (
        <div className="card  bg-base-100 shadow-xl">
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

        <div className="max-h-[150px]  overflow-hidden text-ellipsis  ">
            {parser(content)} 
        </div>

        <Link to={`/blogs/${blog._id}`} className="btn bg-blood text-white mt-4" >Read More</Link>

         
        
      </div>
      
    </div>
    );
};

export default PublishedBlogCard;