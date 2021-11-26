import React, { useState, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import "../css/TinderCards.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Header from './Header';
import axios from 'axios';
function TinderCardsForCandidates() {
    const [allJobs, setAllJobs] = useState([]);
    const [lastDirection, setLastDirection] = useState()

    useEffect(() => {
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        axios.get('http://localhost:8001/api/jobs')
            .then(response => {
                console.log(response);
                setAllJobs(response.data);
            })
            .catch(err => {
                console.log('error ', err);
            })
    }, [])

    const swiped = (direction, id) => {
        if(direction=="right")
        {
            // SelectCandidate({"_id":"2795966449", "candidate_id":id});
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
                            <h1>{job.company}</h1>
                            <p>{job.industries}</p>
                            <p>{job.jobDescription.substring(0,815)}</p>
                            <a href={job.applylink}></a>
                            <h1>{job.jobLocation}</h1>
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
