import Post from './Post';
import DataContext from '../../context/DataContext';
import { useContext, useEffect } from 'react';

const Feed = () => {

    const { posts, setPosts } = useContext(DataContext);

    useEffect(() => {
        setPosts(posts);
    }, [posts, setPosts]);

    return (
        <>
            <div className="row post-card">
                {posts.map(post =>
                    (<Post key={post.id} post={post} />))}
            </div>
        </>
    );
};

export default Feed;