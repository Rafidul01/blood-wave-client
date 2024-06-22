import { Link } from "react-router-dom";

const ContentManagement = () => {
    return (
        <div>
            <h1 className="text-5xl my-96 ">this is content management</h1>
            <Link to={"/dashboard/add-blog"}>Add Blog</Link>
            
        </div>
    );
};

export default ContentManagement;