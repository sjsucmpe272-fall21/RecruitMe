import React, { useState, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import "../css/TinderCards.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Header from './Header';
import axios from 'axios';
import {SelectJob} from '../Components/api_calls/CandidateApiCalls'

function TinderCardsForCandidates() {
    const [allJobs, setAllJobs] = useState([]);
    const [lastDirection, setLastDirection] = useState()

    useEffect(() => {
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:8001/api/getSuitableJobs')
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
             SelectJob({"job_id":id, "candidate_id":"619ef6b4904142342a65a662"});
        }
        setLastDirection(direction);
      }

    return (
        <>
        <Header />
        <div>
            <div className="tinderCards__cardContainer">
                {allJobs.map((job) => {
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
