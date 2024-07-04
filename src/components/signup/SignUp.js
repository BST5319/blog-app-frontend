import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, } from "react";
import api from "../../api/api";
const MOB_REGEX = new RegExp(/^(0|91)[6-9][0-9]{9}$/);
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const SIGNUP_URI = "/signup";

const SignUp = () => {
    const navigate = useNavigate("");
    const [username, setUserName] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [focusUsername, setFocusUsername] = useState(false);

    const [mobileno, setMobileNo] = useState("");
    const [validMobile, setValidMobile] = useState(false);
    const [focusMobile, setfocusMobile] = useState(false);

    const [email, setEmail] = useState("");
    const [validMail, setValidMail] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
        setValidMobile(MOB_REGEX.test(mobileno));
    }, [mobileno]);

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setValidMail(mailformat.test(email));
    }, [email]);


    const resetFormData = () => {
        setUserName("");
        setEmail("");
        setMobileNo("");
        setPwd("");
        setMatchPwd("");
    };



    const handleSubmit = async (e) => {

        e.preventDefault();

        // if button enabled with JS hack
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await api.post(SIGNUP_URI,
                JSON.stringify({ username, pwd, matchPwd, mobileno, email }),
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });
            if (response?.data?.message === "New user created") {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }

        } catch (err) {
            if (err?.response?.status === 409) {
                setErrMsg("Username Taken");
                setTimeout(() => {
                    resetFormData();
                    navigate("/signup");
                    setErrMsg("");
                }, 2500);
            }
            else {
                console.log(err?.response?.message);
                setErrMsg("Registration Failed!");
            }
        }
    };


    return (
        <>
            {success ?
                (<div className="container signup-form-container d-flex justify-content-center flex-column align-items-center mt-5" >
                    <div className={success ? "text-success" : "offscreen"} style={{ fontSize: "25px" }}>Registration Successfull</div>
                    <h6>Redirecting to Login...</h6>
                    <Link to={"/login"}>Login</Link>
                </div>
                ) : (
                    <div className="container signup-form-container">
                        <div className=" border rounded mt-3 p-3" >
                            <form className="signup-text">
                                <p className={errMsg ? "text-danger" : "offscreen"}>{errMsg}</p>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="username" className="form-label">Username:<span className={!username ? "text-danger" : "offscreen"}> *</span></label>
                                    <input type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="Username"
                                        name="username"
                                        value={username}
                                        autoComplete="off"
                                        onFocus={() => setFocusUsername(true)}
                                        onBlur={() => setFocusUsername(false)}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <p id="uidnote" className={focusUsername && username && !validUsername ? "instructions ps-2" : "offscreen"}>
                                        4 to 24 characters.<br />
                                        Must begin with a letter.<br />
                                        Letters, numbers, underscores, hyphens allowed.
                                    </p>
                                </div>
                                <div className="mb-3 mt-3">
                                    <label htmlFor="email" className="form-label">Email:
                                        <span className={!email ? "text-danger" : "offscreen"}> *</span></label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        placeholder="Enter Your Email"
                                        name="email"
                                        autoComplete="off"
                                        onFocus={() => setFocusEmail(true)}
                                        onBlur={() => setFocusEmail(false)}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <p className={focusEmail && !validMail && email ? "instructions ps-3" : "offscreen"} >Valid Email is Required</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="user_number" className="form-label">Number:
                                        <span className={!mobileno ? "text-danger" : "offscreen"}> *</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="user_number"
                                        value={mobileno}
                                        placeholder="Enter Mobile Number"
                                        name="user_number"
                                        autoComplete="off"
                                        onFocus={() => setfocusMobile(true)}
                                        onBlur={() => setfocusMobile(false)}
                                        onChange={(e) => setMobileNo(e.target.value)}
                                    />
                                    <p id="mobilno_note" className={focusMobile && mobileno && !validMobile ? "instructions ps-3" : "offscreen"}>
                                        Must start with: + <br />
                                        Must contain: ex: 91,92<br />
                                        Must contain 10 digits<br />
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:
                                        <span className={!pwd ? "text-danger" : "offscreen"}> *</span></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        value={pwd}
                                        name="password"
                                        autoComplete="off"
                                        onFocus={() => setPwdFocus(true)}
                                        onBlur={() => setPwdFocus(false)}
                                        onChange={(e) => (setPwd(e.target.value))}
                                    />
                                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                        8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpassword" className="form-label">Confirm Password:
                                        <span className={!matchPwd ? "text-danger" : "offscreen"}> *</span></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="cpassword"
                                        value={matchPwd}
                                        placeholder="Confirm password"
                                        name="cpassword"
                                        autoComplete="off"
                                        onFocus={() => setMatchFocus(true)}
                                        onBlur={() => setMatchFocus(false)}
                                        onChange={(e) => (setMatchPwd(e.target.value))}
                                    />
                                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                        Must match the first password input field.
                                    </p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit"
                                        className="btn btn-primary"
                                        disabled={!validMatch || !validMobile || !validMail || !validUsername || !validPwd}
                                        onClick={handleSubmit}
                                    >Register</button>
                                </div>
                                <div>
                                    <p className="mt-2">Already Registered? <Link to={"/login"} className="mt-0">Login</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default SignUp;