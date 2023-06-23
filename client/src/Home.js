import {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import {Link} from "react-router-dom";

export default function Home() {

    const [blogs, setBlogs] = useState([]);

    useEffect(function() {
        async function fetchBlogs() {
            const response = await axios.get("http://localhost:4000/blog");
            setBlogs(response.data);
        }
        fetchBlogs();
    }, []);

    return (
        <main>
            {
                blogs && blogs.map((blog) => (
                    <div className="blog" key={blog._id}>
                        <div className="image-section">
                            <Link to={`/blog/${blog._id}`}>
                                <img src={blog.imageURL} alt="" />
                            </Link>
                        </div>
                        <div className="text-section">
                            <Link to={`/blog/${blog._id}`}>
                                <h1 className="blog-heading">{blog.heading}</h1>
                            </Link>
                            <div>
                                <p className="blog-author">{blog.author}</p>
                                <p className="blog-date">{moment(blog.updatedAt).format("lll")}</p>
                            </div>
                            <p className="blog-summary">{blog.summary}</p>
                        </div>
                    </div>
                ))
            }
        </main>
    );
}