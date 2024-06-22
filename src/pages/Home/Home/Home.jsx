import BlogSection from "../BlogSection/BlogSection";
import Banner from "../Bnnner/Banner";
import ContactUs from "../ContactUs/ContactUs";

const Home = () => {
    return (
        <div className="container mx-auto">

            <Banner/>
            <BlogSection></BlogSection>
            <ContactUs/>
            
        </div>
    );
};

export default Home;