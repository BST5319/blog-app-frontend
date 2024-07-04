import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { MdDelete } from "react-icons/md";


const Comments = ({ post }) => {
  // Getting the postId from the Frontend Url
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const { username, setUsername, setLoginSuccess, setPosts, posts } = useContext(DataContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState("");
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    setComments(post?.comments);
  }, [post]);

  const handleSubmit = async () => {
    let commentId;
    try {
      if (comments.length !== "undefined") {
        commentId = comments.length ? comments[comments.length - 1].id + 1 : 1;
      }
    } catch (err) {
      commentId = 1;
    }
    const postIndex = posts.findIndex(post => post.id === parseInt(id));
    const newComment = { postId: postIndex, id: commentId, commentData, author: username };
    try {
      const result = await axiosPrivate.post("/comment/newComment", JSON.stringify(newComment), {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (result?.data?.message === "ok") {
        comments.push({ id: commentId, author: username, data: commentData });
        setComments([...comments]);
        posts[postIndex].comments.push({ id: commentId, author: username, data: commentData });
        setCommentSuccess(true);
        setTimeout(() => {
          setCommentSuccess(false);
          setCommentData("");
          setPosts([...posts]);
        }, 2000);
      }

    } catch (err) {
      navigate("/login");
      setUsername(null);
      setLoginSuccess(false);
      window.localStorage.setItem("currentUser", "");
      window.localStorage.setItem("isLoggedIn", false);
    }
  };



  const handleDelete = async (e, cid) => {
    const postIndex = posts.findIndex(post => post.id === parseInt(id));
    const commentIndex = posts[postIndex].comments.findIndex((comment) => comment.id === cid);
    e.preventDefault();
    try {

      const result = await axiosPrivate.delete(`/comment/delete/${postIndex}/${cid}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (result?.data?.message === "ok") {
        setComments(comments.filter(comment => comment.id !== cid));
        posts[postIndex].comments.splice(commentIndex, 1);
        setPosts([...posts]);
      }
    }
    catch (err) {
      navigate("/login");
      setUsername(null);
      setLoginSuccess(false);
      window.localStorage.setItem("currentUser", "");
      window.localStorage.setItem("isLoggedIn", false);
    };

  };


  return (
    <div className="container-fluid d-flex flex-column justify-content-center comment-container">
      <div className="container ">
        <div className="border mt-2 p-3 ">
          {
            commentSuccess ? (
              <p className="text-success d-inline" style={{ fontWeight: "bold" }}>Comment Posted Successfully!</p>
            ) : (null)
          }
          <h3>Comments</h3>
          <form method="POST" onSubmit={(e) => e.preventDefault()}>
            <div className="row row-cols-1 mt-3 ">
              <div className="col">
                <textarea
                  className="form-control"
                  rows={"5"}
                  placeholder="Post Your Comment Here"
                  id="message"
                  name="message"
                  value={commentData}
                  onChange={(e) => setCommentData(e.target.value)}
                />
              </div>
            </div>
            <div className="justify-content-end">
              <button
                type="submit"
                className={
                  username
                    ? "btn btn-primary ms-1 mt-2"
                    : "btn btn-primary ms-1 mt-2 disabled"
                }
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </form>
        </div>
        <div className="border border-bottom-0 mt-5">
          <section>
            {comments ? (
              comments?.map((comment) => (
                <ul key={comment?.id} className="p-0">
                  <li
                    key={comment?.id}
                    className="d-flex flex-column  mb-2 p-3"
                    style={{ listStyle: "none" }}
                  >
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <p className="d-inline-flex ms-2 mb-0">{comment?.data}
                      </p>
                      {username && (comment?.author === username) ? (

                        <p className="d-inline-flex justify-content-center"  >
                          <button
                            type="submit"
                            style={{ fontSize: "20px" }}
                            className="btn p-0"
                            onClick={(e) => { handleDelete(e, comment?.id); }}>
                            <MdDelete />
                          </button>
                        </p>
                      )
                        : (null)
                      }
                    </div>
                    <div className="d-inline-flex justify-content-end">
                      -comment by {comment?.author}
                    </div>
                  </li>
                  <div className="border"></div>
                </ul>
              )
              ))
              :
              (null)
            }
          </section>
        </div>
      </div>
    </div>
  );
};

export default Comments;
