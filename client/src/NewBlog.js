import {useContext, useState} from "react";
import {UserContext} from "./UserContext";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function NewBlog() {

    const [image, setImage] = useState('');
    const [heading, setHeading] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const {userInfo} = useContext(UserContext);
    const navigate = useNavigate();

    async function createBlog(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4000/blog/new/${userInfo}`, {imageURL: image, heading, summary, description});
            window.alert(response.data.message);
            if(response.data.message === "Blog created successfully") {
                setImage('');
                setHeading('');
                setSummary('');
                setDescription('');
                navigate("/");
            }
        }
        catch(error) {
            window.alert(error.message);
        }
    }

    return (
        <main>
            <div className="new-blog">
                <h1>Create New Blog</h1>
                <form onSubmit={createBlog}>
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

                    <button type="submit">Create Blog</button>
                </form>
            </div>
        </main>
    );
}