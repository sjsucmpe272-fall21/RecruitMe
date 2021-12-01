import React from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import countryList from 'country-list';
import Select from "react-dropdown-select";

class EmployerSignUp extends React.Component {

    constructor(props) {
        super(props);
        // this.imageRef = React.createRef();
        this.state = {
            email: '',
            password: '',
            authFlag: false,
            companyList: []
        }
        this.getCompanies();
    }

    handleUpload = (event) => {
        console.log(event.target.files[0]);
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('photos', imageFile);
        console.log('formData ', imageFile);

        axios.post('http://localhost:8001/uploadFile', formData)
            .then(response => {
                if (response.status === 200) {
                    console.log('Image name : ', imageFile.name);
                }
            })
    }

    handleSignUp = (details) => {
        console.log('inside handleSignUp react');
        console.log(details);
        axios.post('http://localhost:8001/signup', details)
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response)
                    this.setState({
                        authFlag: true
                    })
                    // this.imageRef.current.value = '';
                }
            })
            .catch(error => {
                console.log("In error");
                this.setState({
                    authFlag: "false"
                });
                console.log(error);
                alert("Account not created. Please try again!");
            })
    }

    getCompanies = () => {
        axios.post('http://localhost:8001/getAllCompanies')
            .then((response) => {
                if (response.status === 200) {
                    console.log("response ", response)
                    this.setState({
                        companyList: response.data.slice()
                    })
                }
            })
            .catch(error => {
                console.log("err ", error);
                // this.setState({
                //     authFlag: "false"
                // });
                // alert("Account not created. Please try again!");
            })
    }

    setValues = (selectValues) => {
        this.setState({ selectValues })
        console.log(selectValues)
    }

    render() {
        let signupMessage;
        if(this.state.authFlag) {
            signupMessage = (
                <>
                <div className="alert alert-success my-3" role="alert">
                    Signup Successful!
                </div>
                </>
                );
        }

        return (

            <div className="container my-5" style={{maxWidth: '35rem'}}>
                <div className="row vh-40 align-items-center justify-content-center">
                {signupMessage}
                    <div className="col card border-danger" style={{height: '33rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Employer Signup</h5>
                            <Formik
                                initialValues={
                                    { 
                                        email: '', 
                                        password: '',
                                        name: '',
                                        company: '',
                                        contactno: ''
                                    }}
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

                                    if(values.contactno.length < 10 || values.contactno.length > 10) {
                                        errors.contactno = 'Contact must be exactly 10 digits';
                                    }
                                    if(values.company === 'defaultVal') {
                                        errors.company = 'Select a company!';
                                    }
                                    return errors;
                                }}

                                onSubmit={(values, { setSubmitting, resetForm}) => {
                                    console.log('in react submit');
                                    values.user='employer';
                                    values.skills=this.state.selectValues;
                                    this.handleSignUp(values);
                                    setSubmitting(true);
                                    resetForm();
                                }}
                            >

                            {({
                                values, 
                                handleChange,
                                handleBlur
                            }) => (
                                <Form encType='multipart/form-data'>
                                    <div className="mb-3">
                                        <label htmlFor="name">Name *</label>
                                        <Field type="text" name="name" className="form-control" id="name" placeholder="Name" required />
                                    </div>
                                    <div  className="mb-3">
                                        <label htmlFor="email">Email address *</label>
                                        <Field type="email" name="email" className="form-control" id="email" placeholder="Email" required />
                                        <ErrorMessage name="email" component="div" />
                                    </div>
                                    {/* <div  className="mb-3">
                                        <label htmlFor="company">Company *</label>
                                        <Field type="text" name="company" className="form-control" id="company" placeholder="Company" required />
                                        <ErrorMessage name="company" component="div" />
                                    </div> */}
                                    <div  className="mb-3">
                                        <label htmlFor="company">Company *</label>
                                        <select
                                            id="company" 
                                            name="company" 
                                            className="form-select"
                                            onChange={handleChange}
                                            required   
                                        >
                                            <option defaultValue key="defaultVal" value="defaultVal">--select company--</option>
                                            {this.state.companyList.map(company => {
                                                return <option key={company._id} value={company.name}>{company.name}</option>
                                            })}
                                        </select>
                                        <ErrorMessage name="company" component="div" />
                                    </div>
                                    <div  className="mb-3">
                                        <label htmlFor="contactno">Contact No. *</label>
                                        <Field type="tel" name="contactno" className="form-control" id="contactno" placeholder="Contact No." pattern="[0-9]{10,10}"  required title="Contact Number having 10 digits" />
                                        <ErrorMessage name="contactno" component="div" />
                                    </div>
                                    <div  className="mb-3">
                                        <label htmlFor="password">Password *</label>
                                        <Field type="password" name="password" className="form-control" id="password" placeholder="Password" required />
                                        <ErrorMessage name="password" component="div" />
                                    </div>
                                        <button type="submit" className="btn btn-danger">Submit</button>
                                </Form>
                            )}
                            </Formik>
                        </div>
                    </div>
                    {signupMessage}
                </div>
            </div>
        );
    }
}

export default EmployerSignUp;