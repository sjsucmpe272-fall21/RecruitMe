import { useEffect, useState } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import { CardActionArea, Stack } from '@mui/material';
// import Header from './Header';
import axios from 'axios';
import NewJob from './NewJob';
import Header from './Header';
import { Container, Stack } from '@mui/material';

export default function NewJoblist() {
    const [allJobs, setAllJobs] = useState([]);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:8001/jobs')
            .then(response => {
                console.log(response);
                setAllJobs(response.data);
            })
            .catch(err => {
                console.log('error ', err);
            })
    }, [])

  return (
    <>
    <Header />
    {/* <Typography gutterBottom variant="h4" component="div">
        Job Listings
    </Typography> */}
    <Container>
        <Stack spacing={2} mx={10} my={5}>
            {allJobs.map(job => {
                return (
                    <NewJob key={job._id} {...job} />
                )
            })}
        </Stack>
    </Container>
    </>
  );
}
