import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password] = useState('');
    const [, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState('Candidate');
    const [loginMessage, setLoginMessage] = useState('');

    function handleLogin(details) {
        console.log(details);
        const otp = localStorage.getItem('otp');
        console.log(otp);
        if(!otp || otp !== String(details.otp)) {
            setLoginMessage(
                <>
                <div className="alert alert-danger my-3" role="alert">
                    Incorrect OTP!
                </div>
                </>
            );
            return;
        }
        axios.post('http://localhost:8001/login', details)
            .then(response => {
                if(response.status === 200) {
                    console.log('response ', response.data);
                    const token = response.data;
                    localStorage.setItem('token', token);
                    response.data = jwt_decode(response.data.split(' ')[1]);
                    localStorage.setItem('userID', response.data.user._id);
                    console.log('userID from localStorage ', localStorage);
                    localStorage.setItem('userType', details.userType);
                    let userName;
                    if(userType === 'Company') {
                        userName = response.data.user.name;
                    }
                    else if(userType === 'Candidate' || userType === 'Employer') {
                        userName = response.data.user.firstName + ' ' + response.data.user.lastName;
                    }
                    localStorage.setItem('userName', userName);
                    localStorage.removeItem('otp');
                    axios.defaults.headers.common['Authorization'] = token;
                    if(token.length > 0) {
                        setIsLoggedIn(true);
                    }
                }
                else {
                    localStorage.removeItem('otp');
                    setLoginMessage(
                        <>
                        <div className="alert alert-danger my-3" role="alert">
                            Incorrect username/password!
                        </div>
                        </>
                    );
                }
            })
            .catch(error => {
                console.log('error ', error);
                localStorage.removeItem('otp');
                setLoginMessage(
                    <>
                    <div className="alert alert-danger my-3 text-center" role="alert">
                        Unable to login!
                    </div>
                    </>
                );
            })
    }

    const handleMailOtp = () => {
        axios.post('http://localhost:8001/mailOTP', {email})
            .then(response => {
                if(response.status === 200) {
                    console.log('response ', response.data);
                    console.log('success: otp mailed');
                    localStorage.setItem('otp', response.data);
                }
                else
                    console.log('Could not mail otp ', response.status);
            })
            .catch(error => {
                console.log('error ', error);
            })
    }

    return (
        <div className="container vw-100 vh-100">
            {localStorage.getItem('token') ? <Redirect to='/home' /> : null}
            <div className="row my-5 align-items-center justify-content-center">
                <div className="col-4">
                    {loginMessage}
                    <div className="card border-danger" style={{maxWidth: '25rem', height: '45rem'}}>
                        <div className="card-body align-middle">
                            <h5 className="card-title">Login</h5>

                            <Formik
                                initialValues={{ email: email, password: password }}
                                validate={values => {
                                    setEmail(values.email);
                                    const errors = {};
                                    if (!values.email) {
                                        errors.email = 'Required!';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }

                                    if( !values.password) {
                                        errors.password = 'Required!';
                                    }
                                    else if(values.password.length < 6) {
                                        errors.password = 'Password must have more than 5 characters!';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }, handleChange) => {
                                    console.log('in react submit');
                                    values.userType=userType;
                                    handleChange = (e) => {
                                        console.log(e.target.name);
                                        if(e.target.name === 'email')
                                            setEmail(e.target.value);
                                    }
                                    handleLogin(values);
                                    setSubmitting(false);
                                }}
                            >

                                {({isSubmitting}) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email address *</label>
                                            <Field type="email" className="form-control" name="email"/>
                                            <ErrorMessage name="email" component="div" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password *</label>
                                            <Field type="password" className="form-control" name="password" />
                                            <ErrorMessage name="password" component="div" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="userType" className="form-label">Login as *</label>
                                            <select 
                                                className="form-select"
                                                value={userType}
                                                onChange={(e) => setUserType(e.target.value)}
                                                name="userType"
                                            >    
                                                <option defaultValue key='Candidate' value='Candidate'>Candidate</option>
                                                <option key='Employer' value='Employer'>Employer</option>
                                                <option key='Company' value='Company'>Company</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="otp" className="form-label">Enter OTP *</label>
                                            <Field type="number" className="form-control" name="otp" required/>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-danger"
                                                onClick={handleMailOtp}
                                            >
                                                Get OTP
                                            </button>
                                            <ErrorMessage name="otp" component="div" />
                                        </div>
                                        <div className="row mt-4 justify-content-center">
                                            <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="row mt-3 text-center">
                                <Link to="/CandidateSignUp">
                                    <span className="align-end">
                                        Click to signup as a jobseeker
                                    </span>
                                </Link>
                            </div>
                            <div className="row my-1 text-center">
                                <Link to="/EmployerSignUp">
                                    <div className="align-items-end">
                                        Click to signup as an employer
                                    </div>
                                </Link>
                            </div>
                            <div className="row my-1 text-center">
                                <Link to="/CompanySignUp">
                                    <div className="align-text-bottom">
                                        Click to signup as a company
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;