import axios from "axios";
import { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import JoditEditor from "jodit-react";
import parse from "html-react-parser";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data, content);
    const imageFile = { image: data.thumbnailImage[0] };
    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // setThumbnailImage(res.data.data.display_url);
  };

 

  return (
    <div className="card w-full  bg-base-100 shadow-xl">

      <div className="card-body ">
        <h2 className="card-title text-center ">Whats on Your Mind?..</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="  space-y-7">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Title</span>
              
            </div>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Title"
              className="input input-bordered w-full "
            />
            
          </label>
          <div className="form-control">
          <div className="label">
              <span className="label-text">Thumbnail Image</span>
            </div>
            <input
              type="file"
              {...register("thumbnailImage", { required: true })}
              className="file-input w-full  file-input-bordered file-input-error"
            />
            {errors.thumbnailImage && (
              <span className="text-red-500">Thumbnail image is required</span>
            )}
          </div>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            className="w-full h-[100vh]"
          />
          <button type="submit" className="btn bg-blood text-white">
            Upload
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default AddBlog;
