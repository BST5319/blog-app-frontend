import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const CONTACT_URI = "/contact";

const Contact = () => {
    const navigate = useNavigate("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [message, setMessage] = useState("");

    const [errMsg, setErrMsg] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);

    const resetForm = () => {
        setName("");
        setEmail("");
        setMobileNo("");
        setMessage("");
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post(CONTACT_URI,
                JSON.stringify({ name, email, mobileNo, message }),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response?.status === 200) {
                setSubmitStatus(true);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            }

        }
        catch (err) {
            if (err?.message) {
                setErrMsg(true);
            }
            setTimeout(() => {
                setErrMsg(false);
            }, 2000);
        }
        resetForm();
    };

    return (
        <div className='container'>
            <div className='border mt-5 p-5 ' >
                {submitStatus ? (
                    <div>
                        <h3 className="text-center">Thank You for Contacting...</h3>
                        <p className="text-center">We will get back to you soon........</p>
                        <p className="text-center">Redirecting to Home Page...</p>
                    </div>
                ) : (
                    <>
                        <h5 className={errMsg ? "visible text-danger" : "invisible"}>Submission Error! Please Refill the Form</h5>
                        <h3 className={"mb-5"}>Get In Touch</h3>
                        <form method='POST' onSubmit={handleSubmit}>
                            <div className='row mt-3'>
                                <div className='col-sm mb-3'>
                                    <input
                                        type='text'
                                        value={name}
                                        id="name"
                                        name="name"
                                        autoComplete="off"
                                        className='form-control border-1'
                                        placeholder='Your Name'
                                        required
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='col-sm mb-3'>
                                    <input
                                        type='email'
                                        value={email}
                                        id="email"
                                        name="email"
                                        autoComplete="off"
                                        className='form-control border-1'
                                        placeholder='Your Email'
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='col-sm mb-3'>
                                    <input
                                        type='number'
                                        value={mobileNo}
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        autoComplete="off"
                                        className='form-control border-1'
                                        placeholder='Your Phone Number'
                                        required
                                        onChange={(e) => setMobileNo(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row row-cols-1 mt-3'>
                                <div className='col'>
                                    <textarea
                                        className="form-control"
                                        value={message}
                                        rows={"5"}
                                        placeholder='Message'
                                        id="message"
                                        name="message"
                                        required
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row mt-5'>
                                <div className='col-4'>
                                    <button type='submit' className='btn btn-primary rounded-4'>Send Message</button>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Contact;