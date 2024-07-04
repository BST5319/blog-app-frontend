import { useState, useContext, useEffect } from "react";
import DataContext from "../../context/DataContext";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import format from "date-fns/format";
import api from "../../api/api";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
const { REACT_APP_SITE } = process.env;

const EditPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const history = useNavigate("");
  const location = useLocation();
  const { posts, setPosts, username, setUsername, setLoginSuccess } =
    useContext(DataContext);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [file, setFile] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const post = posts.find((post) => post.id.toString() === id);
  const url = `${REACT_APP_SITE}/file/${post?.image}`;

  useEffect(() => {
    // if (post) {
    setOldImage(post?.image);
    setEditTitle(post?.title);
    setEditBody(post?.body);
    // }
  }, [post]);

  const handleEdit = async (id) => {
    try {
      const datetime = format(new Date(), "MMMM dd,yyyy pp");
      const updatedPost = {
        id,
        title: editTitle,
        datetime,
        body: editBody,
        image: newFileName ? newFileName : oldImage,
        author: username,
      };
      const response = await axiosPrivate.put(
        `/posts/edit/${id}`,
        JSON.stringify(updatedPost)
      );
      if (response?.data?.message === "Updated Successfully") {
        setTimeout(() => {
          setPosts(posts.map((post) => (post.id === id ? updatedPost : post)));
          history("/");
        }, 1500);
      }
    } catch (err) {
      setUsername("");
      setLoginSuccess(false);
      window.localStorage.setItem("currentUser", "");
      window.localStorage.setItem("isLoggedIn", false);
      history(`/login`, { state: { from: location }, replace: true });
    }
    setEditBody("");
    setEditTitle("");
  };

  useEffect(() => {
    const handleImageUpload = async () => {
      if (file) {
        file.metadata = { uploadedBy: username };
        const data = new FormData();
        data.append("filename", file.name);
        data.append("metadata", JSON.stringify(file.metadata));
        data.append("file", file);
        try {
          const response = await api.post(
            `${REACT_APP_SITE}/upload/update/${oldImage}`,
            data,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setNewFileName(response?.data);
        } catch (err) {
          console.log(err?.message);
        }
      }
    };
    handleImageUpload();
  }, [file, setFile]);

  return (
    <>
      <div className="container d-flex justify-content-center flex-column align-items-center">
        <div>
          <img
            src={url}
            alt="banner"
            className="postpage-image"
            loading="lazy"
          />
        </div>
        <h2>Edit Post</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="col-sm mb-3">
            <div className="mb-3 ">
              <label htmlFor="postTitle">Title:</label>
            </div>
            <div>
              <input
                id="postTitle"
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="postImage">NewImage:</label>
            </div>
            <div>
              <input
                id="postImage"
                type="file"
                required
                accept=".jpg,.png, .jpeg, .webp"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div>
            <label htmlFor="postBody">Post:</label>
          </div>
          <div className="row row-cols-1 mt-3">
            <div className="col">
              <textarea
                className="form-control"
                value={editBody}
                rows={"5"}
                id="postBody"
                onChange={(e) => setEditBody(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleEdit(post.id)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPost;
