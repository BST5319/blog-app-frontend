import { useContext } from 'react';
import Post from './Post';
import DataContext from '../../context/DataContext';
const MyPosts = () => {
    const { posts, username } = useContext(DataContext);
    const myPosts = posts.filter(post => post.author === username);
    return (
        <>

            <div className="container d-flex justify-content-center ">
                <main className='Home'>
                    <div className="row post-card">
                        {myPosts.map(post =>
                            (<Post key={post.id} post={post} />))}
                    </div>

                </main>
            </div>
        </>
    );
};

export default MyPosts;