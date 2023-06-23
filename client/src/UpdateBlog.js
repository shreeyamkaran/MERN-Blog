import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function UpdateBlog() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [image, setImage] = useState('');
    const [heading, setHeading] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');

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
                    setImage(response.data.blog.imageURL);
                    setHeading(response.data.blog.heading);
                    setSummary(response.data.blog.summary);
                    setDescription(response.data.blog.description);
                }
            }
            catch(error) {
                window.alert(error.message);
            }
        }
        fetchBlogDescription();
    }, []);

    async function updateBlog(ev) {
        ev.preventDefault();
        try {
            const response = await axios.patch(`http://localhost:4000/blog/${id}`, {imageURL: image, heading, summary, description});
            window.alert(response.data.message);
            if(response.data.message === "Blog updated successfully") {
                navigate(`/blog/${id}`);
            }
        }
        catch(error) {
            window.alert(error.message);
        }
    }

    return (
        <main>
            <div className="new-blog">
                <h1>Update Blog</h1>
                <form onSubmit={updateBlog}>
                    <div className="field">
                        <label htmlFor="blog-image">Image URL: </label>
                        <input type="text" id="blog-image" value={image} onChange={ev => setImage(ev.target.value)} />
                    </div>

                    <div className="field">
                        <label htmlFor="blog-heading">Heading: </label>
                        <input type="text" id="blog-heading" value={heading} onChange={ev => setHeading(ev.target.value)} />
                    </div>

                    <div className="field">
                        <label htmlFor="blog-summary">Summary: </label>
                        <input type="text" id="blog-summary" value={summary} onChange={ev => setSummary(ev.target.value)} />
                    </div>

                    <div className="field">
                        <label htmlFor="blog-description">Description: </label>
                        <textarea id="blog-description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>
                    </div>

                    <button type="submit">Update Blog</button>
                </form>
            </div>
        </main>
    );
}