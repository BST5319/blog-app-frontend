import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import api from '../../api/api';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { format } from 'date-fns';


const NewPost = () => {
    const axiosPrivate = useAxiosPrivate();
    const history = useNavigate("");
    const { username, posts, setPosts, setUsername, setLoginSuccess } = useContext(DataContext);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const user = useRef(username);

    const handleSubmit = async () => {
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd,yyyy pp");

        try {
            const response = await axiosPrivate.post("/posts/newPost",
                JSON.stringify({ id, username, title, body, fileName, datetime }),
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            if (response?.status === 200) {
                setPosts([...posts, { id, title, body, image: fileName, datetime, author: username }]);
                setTimeout(() => {
                    history("/");
                    setTitle("");
                    setBody("");
                    setFileName("");
                }, 1500);
            }
        }
        catch (err) {
            console.log("error", err.message);
            setUsername(null);
            setLoginSuccess(false);
            window.localStorage.setItem("currentUser", "");
            window.localStorage.setItem("isLoggedIn", false);
            history("/login");
        }
    };

    useEffect(() => {
        setUsername(window.localStorage.getItem("currentUser"));
    }, []);

    useEffect(() => {
        const handleImageUpload = async () => {
            if (file) {
                file.metadata = { "uploadedBy": user };
                const data = new FormData();
                data.append("filename", file.name);
                data.append("metadata", JSON.stringify(file.metadata));
                data.append("file", file);
                try {
                    const response = await api.post(`/upload/file`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    setFileName(response?.data);
                }
                catch (err) {
                    console.log(err?.message);
                }
            }
        };
        handleImageUpload();
    }, [file, setFile]);


    // Image can be stored as base64 Stringstream
    // const convertToBase64 = (e) => {
    //     console.log(e);
    //     const reader = new FileReader();
    //     reader.readAsDataURL(e.target.files[0]);
    //     reader.onload = () => {
    //         console.log(reader.result);
    //         setFile(reader.result);
    //     };
    //     reader.onerror = (error) => {
    //         console.log("Error:", error);
    //     };
    // };

    return (
        <>
            <div className='container d-flex justify-content-center flex-column'>
                <h2>New Post</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className='col-sm mb-3'>
                        <div className='mb-3 '>
                            <label htmlFor="postTitle">Title:</label>
                        </div>
                        <div >
                            <input
                                id="postTitle"
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='col-sm mb-3'>
                        <div className='mb-3 '>
                            <label htmlFor="image">Image:</label>
                        </div>
                        <div >
                            <input
                                id="image"
                                type="file"
                                required
                                accept=".jpg,.png, .jpeg, .webp"
                                onChange={(e) => { setFile(e.target.files[0]); }}
                            />
                        </div>
                    </div>
                    <div>

                        <label htmlFor="postBody">Post:</label>
                    </div>
                    <div className='row row-cols-1 mt-3'>
                        <div className='col'>
                            <textarea
                                className="form-control"
                                value={body}
                                rows={"5"}
                                id="postBody"
                                required
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button type="button" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewPost;