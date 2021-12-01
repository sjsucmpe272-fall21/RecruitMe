import { React, useEffect, useState } from 'react';
import { Box, Grid, Paper, Stack, FormGroup, Button } from '@mui/material';
import Header from '../Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select as SpecialSelect } from "react-dropdown-select";
import Select from '@mui/material/Select';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import TinderCardsForCandidates from '../TinderCardsForCandidates';
export default function CandidateDesiredFilter(props) {
    const [seniorityLevel, setSeniorityLevel] = useState([]);
    const [jobType, setJobType] = useState([]);
    const [skills, setSkills] = useState([]);
    const [redirect,setRedirect] = useState(false);

    useEffect(() => {
        // const userID = localStorage.getItem('userID');
        // console.log('userID ', userID);
        // axios.post('/api/candidate/prof', {candidate_id: userID})
        //     .then(response => {
        //         console.log(response.data);
        //         const skills = response.data[0].skills.map(((a)=>`${a.name}`).join(' '));
        //         console.log('skills ', skills);
        //         setSkills(skills);
        //     })
        //     .catch(err => {
        //         console.log('error ', err);
        //     })
    }, []);

    const handleChange = (event) => {
        if(event.target.name === 'jobType') {
            setJobType(event.target.value);
        }
        else if(event.target.name === 'seniorityLevel') {
            setSeniorityLevel(event.target.value);
        }
    };

    const handleApplyFilter = () => {
        setRedirect(true);

        // console.log('inside apply filter ', seniorityLevel, jobType, skills);
        // const userID = localStorage.getItem('userID');
        // axios.post('/api/applyFilters', {
        //     userID,
        //     seniorityLevel: seniorityLevel.toString(),
        //     jobType: jobType.toString(),
        //     skills: skills
        // })
        //     .then(response => {
        //         setRedirect(true);
        //         <Redirect to='/candidate' />
        //         console.log('successfully saved filter results to db');
        //         // const skills = response.data[0].skills.map(skillArray => skillArray[0]);
        //         // console.log('skills ', skills);
        //         // setSkills(skills);
        //     })
        //     .catch(err => {
        //         console.log('error ', err);
        //     })
    }
    if(redirect)
        return <TinderCardsForCandidates skills={skills}/>

    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1 }} marginTop={3}>
            <FormGroup>
                <Grid container spacing={2} justifyContent={'space-around'} textAlign={'center'}>
                    <Grid item xs={12} md={4} spacing={2}>
                        <Stack spacing={2}>
                            <Paper>Skills filter</Paper>
                            <SpecialSelect 
                                options={skills} 
                                onChange={values => setSkills(values)} 
                                multi={true}
                                placeholder='Select skills'
                                color= "#FF0000"
                                create={true}
                                clearable={true}
                                searchBy='name'
                                addPlaceholder= "+ click to add"
                                values={skills}
                                labelField='name'
                                valueField='name'
                                name='skills'
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={2}>
                            <Paper>Job type filter</Paper>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={jobType}
                                    label="Job Type"
                                    onChange={handleChange}
                                    name="jobType"
                                    color="error"
                                >
                                    <MenuItem value="Full-Time">Full-Time</MenuItem>
                                    <MenuItem value="Part-Time">Part-Time</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={2}>
                            <Paper>Seniority level filter</Paper>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Seniority level</InputLabel>
                                <Select
                                    multiple
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={seniorityLevel}
                                    label="Seniority level"
                                    onChange={handleChange}
                                    name="seniorityLevel"
                                    color="error"
                                >
                                    <MenuItem value="Entry level">Entry level</MenuItem>
                                    <MenuItem value="Mid-Senior level">Mid-Senior level</MenuItem>
                                    <MenuItem value="Associate">Associate</MenuItem>
                                    <MenuItem value="Not Applicable">Not Applicable</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button 
                            variant="contained"
                            onClick={handleApplyFilter}
                        >
                            Apply Filter
                        </Button>
                    </Grid>
                </Grid>
                </FormGroup>
            </Box>
        </>
    );
}