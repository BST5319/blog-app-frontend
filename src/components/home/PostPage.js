import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Comments from './Comments';
// import api from '../../api/api';
const { REACT_APP_SITE } = process.env;

const PostPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const { posts, setPosts, username, setUsername } = useContext(DataContext);
    const [post, setPost] = useState((prev) => {
        const data = posts.find((post) => (post.id).toString() === id);
        return data ? data : prev;
    });
    useEffect(() => {
        setPost(posts.find((post) => (post.id).toString() === id));
    }, [posts]);

    const handleDelete = async (id) => {
        try {
            const response = await axiosPrivate.delete(`/posts/delete/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const result = response.status;
            if (result === 200) {
                setPosts(posts.filter((post) => post.id !== id));
                navigate("/");
            }
        } catch (err) {
            console.log("error", err.message);
            setUsername("");
            navigate("/login", { state: { from: location }, replace: true });
        }
    };


    return (
        <div className='container p-0'>
            <div className='container-fluid d-flex flex-column justify-content-center align-items-center p-0'>
                <img src={`${REACT_APP_SITE}/file/${post?.image}`} alt='banner' className='postpage-image' loading='lazy' />
                <h1 className='mt-3'>{post?.title}</h1>
                <p className="postDate ">{post?.datetime}</p>
                <p className="postAuthor">Author: {post?.author}</p>
                {post?.author === username ? (
                    <div className='mt-2 mb-2'>
                        <Link to={`/edit/${post?.id}`}><button className="btn btn-danger">Edit Post</button></Link>
                        <button className="btn btn-secondary ms-1" onClick={() => handleDelete(post?.id)}>
                            Delete Post
                        </button>
                    </div>
                ) : (<></>)
                }
                <p className="mt-3 text-center p-3">{post?.body}</p>
            </div>
            <div>
                <Comments post={post} />
            </div>
        </div>
    );
};

export default PostPage;