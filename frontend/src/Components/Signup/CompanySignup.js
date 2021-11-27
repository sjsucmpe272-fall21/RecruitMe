import React from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import countryList from 'country-list';
import Select from "react-dropdown-select";

class CompanySignUp extends React.Component {

    constructor(props) {
        super(props);
        // this.imageRef = React.createRef();
        this.state = {
            email: '',
            password: '',
            authFlag: false,
            options: [{name: 'software'}, {name: 'business'}, {name: 'technology'}, {name: 'advertising'}],
            multi: true,
            searchable: true,
            keepSelectedInList: true,
            clearable: false,
            searchBy: "name",
            addPlaceholder: "+ click to add",
            selectValues: []
        }
    }

    // handleUpload = (event) => {
    //     console.log(event.target.files[0]);
    //     const imageFile = event.target.files[0];
    //     const formData = new FormData();
    //     formData.append('photos', imageFile);
    //     console.log('formData ', imageFile);

    //     axios.post('http://localhost:8001/uploadFile', formData)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 console.log('Image name : ', imageFile.name);
    //             }
    //         })
    // }

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
                    <div className="col card border-danger" style={{height: '57rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">Company Signup</h5>
                            <Formik
                                initialValues={
                                    { 
                                        email: '', 
                                        password: '',
                                        name: '',
                                        contactno: '',
                                        country: '',
                                        state: '',
                                        city: '',
                                        street: '',
                                        description: ''
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
                                    return errors;
                                }}

                                onSubmit={(values, { setSubmitting, resetForm}) => {
                                    console.log('in react submit');
                                    values.user='company';
                                    values.industries=this.state.selectValues;
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
                                    <div  className="mb-3">
                                        <label htmlFor="contactno">Contact No. *</label>
                                        <Field type="tel" name="contactno" className="form-control" id="contactno" placeholder="Contact No." pattern="[0-9]{10,10}"  required title="Contact Number having 10 digits" />
                                        <ErrorMessage name="contactno" component="div" />
                                    </div>
                                    <div  className="mb-1">
                                        <label htmlFor="dob">Description *</label>
                                        <Field type="text" name="description" className="form-control" id="description" placeholder="Description" required />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="" className="col-form-label">Industries</label>
                                        <Select 
                                            options={this.state.options} 
                                            onChange={values => this.setValues(values)} 
                                            multi={true}
                                            placeholder='Select industries'
                                            color= "#FF0000"
                                            create={true}
                                            clearable={true}
                                            searchBy='name'
                                            addPlaceholder= "+ click to add"
                                            values={[this.state.options.find(opt => opt.name === 'software')]}
                                            labelField='name'
                                            valueField='name'
                                        />
                                    </div>
                                    <div  className="mb-3">
                                        <label htmlFor="state">Street Address *</label>
                                        <Field type="text" name="street" className="form-control" id="street" placeholder="Street Address" required />
                                    </div>
                                    <div  className="mb-3">
                                        <label htmlFor="state">State *</label>
                                        <Field type="text" name="state" className="form-control" id="state" placeholder="State" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="city">City *</label>
                                        <Field type="text" name="city" className="form-control" id="city" placeholder="City" required />
                                    </div>
                                    <div  className="mb-3">
                                        <label htmlFor="country">Country</label>
                                        <select 
                                            id="country" 
                                            name="country" 
                                            className="form-select"
                                            onChange={handleChange}    
                                        >
                                            {countryList.getNames().map(name => {
                                                return <option key={name} value={name}>{name}</option>
                                            })}
                                        </select>
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

export default CompanySignUp;