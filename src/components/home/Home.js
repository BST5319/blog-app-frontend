import { useContext, useEffect } from "react";
import Feed from "./Feed";
import DataContext from "../../context/DataContext";


const Home = () => {
    const { posts, fetchError, isLoading, setPosts } = useContext(DataContext);

    useEffect(() => {
        setPosts(posts);
    }, [posts, setPosts]);

    return (
        <div className="container d-flex justify-content-center ">
            <main className='Home'>
                {isLoading && <p className="statusMsg">Loading posts...</p>}
                {!isLoading && fetchError && <p className="statusMgs" style={{ color: "red" }}>{fetchError}</p>}
                {!isLoading && !fetchError && (posts.length ? <Feed /> : <p className="statusMsg">No posts to display</p>)}
            </main>
        </div>

    );
};

export default Home;