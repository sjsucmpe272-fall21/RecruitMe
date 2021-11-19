import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

function Login(props) {
    const [email] = useState('');
    const [password] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLogin(details) {
        console.log(details);
        axios.post('http://localhost:8001/login', details)
            .then(response => {
                console.log('response ', response);
                const token = response.data;
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token;
                if(token.length > 0) {
                    setIsLoggedIn(true);
                }
            })
            .catch(error => {
                console.log('error ', error);
            })
    }

    return (
        <div className="container my-5" style={{maxWidth: '25rem'}}>
            {localStorage.getItem('token') ? <Redirect to='/home' /> : null}
                <div className="col card" style={{maxWidth: '25rem'}}>
                    <div className="card-body align-middle">
                        <h5 className="card-title">Login</h5>

                        <Formik
                            initialValues={{ email: email, password: password }}
                            validate={values => {
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
                            onSubmit={(values, { setSubmitting }) => {
                                console.log('in react submit');
                                if(!values.isEmployer) {
                                    values.isEmployer = false;
                                }
                                handleLogin(values);
                                setSubmitting(false);
                            }}
                        >

                            {({isSubmitting}) => (
                                <Form>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address *</label>
                                        <Field type="email" className="form-control" name="email" />
                                        <ErrorMessage name="email" component="div" />
                                        {/* <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" required autoFocus /> */}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password *</label>
                                        <Field type="password" className="form-control" name="password" />
                                        <ErrorMessage name="password" component="div" />
                                        {/* <input type="password" className="form-control" id="password" name="password" placeholder="Password" required /> */}
                                    </div>
                                    <div className="mb-3 form-check">
                                        {/* <label htmlFor="accountType" className="form-check-label"></label> */}
                                        <Field type="checkbox" className="form-check-input" name="isEmployer"/>
                                         Check the box if you are a Employer
                                        {/* <ErrorMessage name="acco" component="div" /> */}
                                        {/* <input type="password" className="form-control" id="password" name="password" placeholder="Password" required /> */}
                                    </div>
                                    <div className="row mt-5 justify-content-center">
                                        <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <Link to="/JobseekerSignUp">New Jobseeker? Sign up here</Link>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-8">
                            <Link to="/EmployerSignUp">New Employer? Sign up here</Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Login;