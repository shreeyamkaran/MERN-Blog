import {useContext, useEffect, useState} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import moment from "moment";
import {UserContext} from "./UserContext";

export default function BlogDesc() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const {userInfo} = useContext(UserContext);

    useEffect(function() {
        async function fetchBlogDescription() {
            try {
                const response = await axios.get(`http://localhost:4000/blog/desc/${id}`);
                if(response.data.message !== "success") {
                    window.alert(response.data.message);
                    navigate("/");
                }
                else {
                    setBlog(response.data.blog);
                }
            }
            catch(error) {
                window.alert(error.message);
            }
        }
        fetchBlogDescription();
    }, []);

    async function deleteBlog() {
        try {
            const response = await axios.delete(`http://localhost:4000/blog/${id}`);
            window.alert(response.data.message);
            if(response.data.message === "Blog deleted successfully") {
                navigate("/");
            }
        }
        catch(error) {
            window.alert(error.message);
        }
    }


    return (
        <main>
            {
                blog && (
                    <div className="single-blog-page">
                        <h1>{blog.heading}</h1>
                        <div className="author-info">
                            <p className="author">{blog.author}</p>
                            <p className="blog-date">{moment(blog.updatedAt).format("lll")}</p>
                        </div>
                        {
                            (userInfo === blog.author) && (
                                <div className="button-group">
                                    <Link to={`/update/${blog._id}`}>Update</Link>
                                    <button className="delete-button" onClick={deleteBlog}>Delete</button>
                                </div>
                            )
                        }
                        <img src={blog.imageURL} alt="" />
                        <p className="blog-description">{blog.description}</p>
                    </div>
                )
            }
        </main>
    );
}