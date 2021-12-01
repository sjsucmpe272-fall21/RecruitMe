import { React, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Stack } from "@mui/material";
import Header from "./Header";
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState('');
    const userType = localStorage.getItem('userType');

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        console.log('userID ', userID);
        if(userType === 'Candidate') {
            axios.post('http://localhost:8001/api/candidate/prof', {candidate_id: userID})
            .then(response => {
                console.log(response.data);
                const skills = response.data[0].skills.map(skillArray => skillArray[0]);
                console.log('skills ', skills);
                setUser(response.data[0]);
            })
            .catch(err => {
                console.log('error ', err);
            })
        }
        else if(userType === 'Employer') {
            axios.post('http://localhost:8001/api/employer', {employerId: userID})
            .then(response => {
                console.log(response.data);
                setUser(response.data[0]);
            })
            .catch(err => {
                console.log('error ', err);
            })
        }
        else if(userType === 'Company') {
            axios.post('http://localhost:8001/companyProfile', {companyID: userID})
            .then(response => {
                console.log(response.data);
                setUser(response.data[0]);
            })
            .catch(err => {
                console.log('error ', err);
            })
        }
    }, []);  

    
    return (
        <>
        <Header />
        <Grid margin={10} justifyContent="center" alignItems="center">
            <Stack spacing={3}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    label="Name"
                    value={userType === 'Company' ? user.name : user.firstName+' '+user.lastName}
                    variant="outlined"
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    id="outlined-required"
                    label="Email"
                    value={user.email}
                    variant="outlined"
                />
                {
                    userType === 'Employer' && 
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Company"
                        value={user.company}
                        variant="outlined"
                    />
                }
                {
                    userType === 'Company' && 
                    <>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Description"
                        value={user.description}
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Industries"
                        value={user.industries && user.industries.map(industry => industry[0].name).toString()}
                        variant="outlined"
                    />
                    </>
                }
                {
                    userType === 'Candidate' && 
                    <>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Desired Job Type"
                        value={user.desiredJobType}
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Desired Seniority Level"
                        value={user.desiredSeniorityLevel}
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="outlined-required"
                        label="Skills"
                        value={user.skills && user.skills.map(skill => skill[0].name).toString()}
                        variant="outlined"
                    />
                    </>
                }
                {
                    (userType === 'Candidate' || userType === 'Company') && 
                    <>
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="phone"
                        label="Phone"
                        value={userType === 'Candidate' ? user.phoneNumber : user.phone}
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="date"
                        label="Street Address"
                        value={userType === 'Candidate' ? user.streetAddress : user.address && user.address.street_address}
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="date"
                        label="City"
                        value={userType === 'Candidate' ? user.city : user.address && user.address.city}
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="date"
                        label="State"
                        value={userType === 'Candidate' ? user.state : user.address && user.address.state}
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ shrink: true }}
                        id="date"
                        label="Country"
                        value={userType === 'Candidate' ? user.country : user.address && user.address.country}
                        variant="outlined"
                    />
                    </>
                }
                {/* <Container maxWidth="md">
                    <Button variant="contained" size="large" color="primary">
                    Speichern
                    </Button>
                </Container> */}
            </Stack>
        </Grid>
        </>
    )
}