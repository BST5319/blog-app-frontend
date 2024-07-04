import { Link } from "react-router-dom";
const Missing = () => {
    return (
        <div className='container d-flex justify-content-center flex-column align-items-center mt-5'>
            <h2>Page Not Found</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit Our Homepage</Link>
            </p>
        </div>
    );
};

export default Missing;