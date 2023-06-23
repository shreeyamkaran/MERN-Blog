import {Routes, Route} from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import NewBlog from "./NewBlog";
import Login from "./Login";
import Register from "./Register";
import BlogDesc from "./BlogDesc";
import UpdateBlog from "./UpdateBlog";

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new/blog" element={<NewBlog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog/:id" element={<BlogDesc />} />
                <Route path="/update/:id" element={<UpdateBlog />} />
            </Routes>
        </>
    );
}