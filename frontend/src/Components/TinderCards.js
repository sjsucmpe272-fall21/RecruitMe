import React, { useState, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import "../css/TinderCards.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Header from './Header';
import {SelectCandidate} from "./api_calls/EmployerApiCalls"
import GithubDetails from './GithubDetails';
import {getCandidates} from "./api_calls/EmployerApiCalls"

import axios from "axios";
import { GETCOMPFROMID, GETJOBS, APP_CAN } from "../api";

function TinderCards() {
    const userID  = localStorage.getItem("userID") ? localStorage.getItem("userID") : null;

    const [people, setPeople] = useState([]);

    //     {
    //         "_id":1,
    //         name: 'Steve',
    //         url: ["https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2MzU3OTcxMTUwODQxNTM1/steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg"],
    //         githubUserName: "vineetk10"
    //     },
    //     {
    //         "_id":2,
    //         name: 'Mark',
    //         url: ["https://media.wired.com/photos/5ed6891ed9fb171733fd7840/1:1/w_1287,h_1287,c_limit/Ideas-Zuckerberg-1200875675.jpg", "https://i.insider.com/60c1df3823393a00188e25dc?width=1000&format=jpeg&auto=webp"],
    //         githubUserName: "scopsy"
    //     }
    // ]);
    useEffect(() => {

        // List Jobs
        const getjobs = async () =>
        {
            // get employer's company
            let company_response = await axios.post(GETCOMPFROMID,{'userID': userID})
            let company = company_response.data[0].company
            // console.log('company: ',company)

            // get all jobs for this company
            let jobs_response = await axios.post(GETJOBS,{'company':company})
            let jobs = jobs_response.data
            // console.log("jobs: ",jobs)      

            let job_det = {}
            // get applied and selected candidate's names
            let applied_candidates = {}
            for (let i=0; i<jobs.length; i++)
            {
                let jobid = jobs[i]._id
                applied_candidates[jobid] = jobs[i].candidates_applied
                job_det[jobid] = jobs[i]
            }

            let selected_candidates = {}
            for (let i=0; i<jobs.length; i++)
            {
                let jobid = jobs[i]._id
                selected_candidates[jobid] = jobs[i].candidates_selected
                job_det[jobid] = jobs[i]
            }
            // console.log(selected_candidates)

            // Data for applied candidates
            let app_can_response = await axios.post(APP_CAN,applied_candidates)
            let app_can = app_can_response.data

            let app_can_data = []
            for (let jid in app_can)
            {
                    for (let i=0; i<app_can[jid].length; i++)
                    {
                        let temp = {}
                        temp.job_id = jid
                        temp.job_title = job_det[jid].name
                        temp.candidate_id = app_can[jid][i]._id
                        temp.candidate_name = app_can[jid][i].firstName + ' ' + app_can[jid][i].lastName
                        temp.phone = app_can[jid][i].phoneNumber
                        app_can_data.push(temp)
                    }
            }

            let mydata = []
            for (let jobid in app_can)
            {
                for (let i=0; i<app_can[jobid].length; i++)
                {
                    let can = app_can[jobid][i]
                    can.job_id = jobid
                    mydata.push(can)
                }
            }

            console.log('applied_candidates: ',mydata)
        }
        getjobs()



        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        // getCandidates({"jobId":"1234"})
        //     .then(response => {
        //         console.log(response.data.body.hits.hits);
        //         setPeople(response.data.body.hits.hits);
        //     })
        //     .catch(err => {
        //         console.log('error ', err);
        //     })

            getCandidates()
            .then(response => {
                console.log(response.data.body.hits.hits);
                setPeople(response.data.body.hits.hits);
            })
            .catch(err => {
                console.log('error ', err);
            })
    }, [])

    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, id) => {
        if(direction=="right")
        {
            SelectCandidate({"_id":"2795966449", "candidate_id":id});
        }
        setLastDirection(direction);
      }

    return (
        <>
        <Header />
        <div>
            <div className="tinderCards__cardContainer">
                {people.map((person) => {
                    return <TinderCard className="swipe" key={person.name} onSwipe={(dir) => swiped(dir, person._id)}
                    preventSwipe={['up', 'down']}>
                        <div
                            className="card">
                            <Carousel showThumbs={false} infiniteLoop={true} showStatus={false}>
                                {person.url.length > 0 && person.url.map((image) => {
                                    return <div className="card">
                                        <img className="card__image" src={image} alt="profile" />
                                    </div>
                                })}
                                <GithubDetails githubUserName={person.githubUserName}/>
                            </Carousel>
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                })}
            </div>
            {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
        </div>
        </>
    )
}

export default TinderCards