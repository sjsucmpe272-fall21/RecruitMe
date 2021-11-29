import React, { useState, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import "../css/TinderCards.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Header from './Header';
import axios from 'axios';
import {SelectJob,GetSimilarJobs} from '../Components/api_calls/CandidateApiCalls'
import {isAuthenticated} from "../authHelper/auth"

function TinderCardsForCandidates() {
    const [allJobs, setAllJobs] = useState([]);
    const [similarJobs, setSimilarJobs] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const {user}  = isAuthenticated();
    useEffect(() => {
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.post('http://localhost:8001/api/getSuitableJobs',{"candidate_id":user._id})
            .then(response => {
                console.log(response.data.body.hits.hits);
                setAllJobs(response.data.body.hits.hits);
            })
            .catch(err => {
                console.log('error ', err);
            })
    }, [])

    const swiped = (direction, id) => {
        if(direction=="right")
        {
             SelectJob({"job_id":id, "candidate_id":user._id});
            //  GetSimilarJobs({"job_id":id})
            //  .then(response=>{
            //     console.log(response.data.body.hits.hits);
            //     setSimilarJobs(response.data.body.hits.hits);
            //     setAllJobs([...similarJobs]);
            //  })
            //  .catch(err => {
            //     console.log('error ', err);
            // })
        }
        setLastDirection(direction);
      }

    return (
        <>
        <Header />
        <div>
            <div className="tinderCards__cardContainer">
                {allJobs.slice(0).reverse().map((job) => {
                    return <TinderCard className="swipe" key={job._id} onSwipe={(dir) => swiped(dir, job._id)}
                    preventSwipe={['up', 'down']}>
                        <div
                            className="card">
                            <h1>{job._source.company}</h1>
                            <p>{job._source.industries}</p>
                            <p>{job._source.jobDescription.substring(0,720)}</p>
                            <a href={job._source.applyLink}>Apply Link</a>
                            <h1>{job._source.jobLocation}</h1>
                        </div>
                    </TinderCard>
                })}
            </div>
            {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
        </div>
        </>
    )
}

export default TinderCardsForCandidates
