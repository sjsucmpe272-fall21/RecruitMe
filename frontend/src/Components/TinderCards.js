import React, { useState, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import "../css/TinderCards.css"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import GithubDetails from './GithubDetails';

function TinderCards() {
    const [people, setPeople] = useState([
        {
            name: 'Steve',
            url: ["https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2MzU3OTcxMTUwODQxNTM1/steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg"],
            githubUserName: "vineetk10"
        },
        {
            name: 'Mark',
            url: ["https://media.wired.com/photos/5ed6891ed9fb171733fd7840/1:1/w_1287,h_1287,c_limit/Ideas-Zuckerberg-1200875675.jpg", "https://i.insider.com/60c1df3823393a00188e25dc?width=1000&format=jpeg&auto=webp"],
            githubUserName: "scopsy"
        }
    ]);

    return (
        <div>
            <div className="tinderCards__cardContainer">
                {people.map((person) => {
                    return <TinderCard className="swipe" key={person.name} preventSwipe={['up', 'down']}>
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
        </div>
    )
}

export default TinderCards
