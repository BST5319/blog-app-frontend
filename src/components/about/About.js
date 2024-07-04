import { Link } from 'react-router-dom';
import { FaGithub } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { PiHandWavingBold } from "react-icons/pi";

import About_Banner from "../../img/About_Banner.jpg";
const About = () => {
    return (
        <>
            <div className='container-fluid m-0 p-0'>
                <img src={About_Banner} alt='Banner' className="about-image" loading='lazy' />
            </div>
            <div className='container'>
                <div className=' d-flex justify-content-center align-items-center flex-column mt-5'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h4 className='text-center'>Hello! <PiHandWavingBold /> This is Burhanuddin Tinwala here</h4>
                    </div>
                    <div className='ps-5 pe-5 text-center mt-2'>I'm a Computer Science student based in India.
                        If you are interested, you can view some of my favorite projects here
                        <span className='ps-2'>
                            <Link to="https://github.com/BST5319" color="inherit" target="_blank"><FaGithub size={"30px"} /></Link>
                        </span>
                    </div>
                    <div className='ps-5 pe-5 text-center mt-3 mb-5'>
                        Need something built or simply want to have chat? Send me a mail
                        <span className='ps-2'>
                            <Link to="mailto:burhan.s.tinwala@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                                <HiOutlineMailOpen size={"30px"} />
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;