import { Link } from 'react-router-dom';
const { REACT_APP_SITE } = process.env;
const Post = ({ post }) => {

    return (
        <div className="col-4 post-column">
            <div className="card mt-5">
                <div className="card h-100">
                    <img src={`${REACT_APP_SITE}/file/${post.image}`} className="card-img-top" alt="..." loading='lazy' />
                    <div className='card-body post-card-body'>
                        <Link to={`/post/${post.id}`} >
                            <div className='card-title'>
                                <h3>{post.title.length <= 11 ? post.title : `${(post.title).slice(0, 11)}...`}</h3>
                            </div>
                            <p className="postDate">{post.datetime}</p>
                        </Link>
                        <div className='card-text'>
                            <p className="postBody">{post.body.length <= 15 ? post.body : `${(post.body).slice(0, 15)}...`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;