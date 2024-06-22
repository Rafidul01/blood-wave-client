/* eslint-disable react/prop-types */
import parser from "html-react-parser";
const BlogCard = ({blog, isAdmin, handleStatus}) => {
    const {content, title, thumbnailImage, status } = blog;
    console.log(blog)
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
      
        <div className="badge bg-blood text-white absolute right-4 top-4 uppercase">{status}</div>
      </div>
      <div className="card-body ">
        <h2 className="text-2xl text-center mb-4 text-blood">{title}</h2>

        <div>
            {parser(content)}
        </div>

         
        
      </div>
      {isAdmin && <div className="card-actions justify-end m-4">
         {
            status === "draft" && <button onClick={() => handleStatus(blog._id, "published") } className="btn bg-blood  text-white w-full">Publish</button>
         }
         {
            status === "published" && <button onClick={() => handleStatus(blog._id, "draft") } className="btn bg-blood  text-white w-full">Unpublish</button>
         }
          
        </div>}
    </div>
  );
};

export default BlogCard;
