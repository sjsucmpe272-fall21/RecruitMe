import React, {useState} from 'react'
import TinderCard from "react-tinder-card"
import "./TinderCards.css"
function TinderCards() {
    const [people,setPeople] = useState([
        {
            name: 'Steve',
            url: "https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2MzU3OTcxMTUwODQxNTM1/steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg"
        },
        {
            name: 'Mark',
            url:"https://i.insider.com/60c1df3823393a00188e25dc?width=1000&format=jpeg&auto=webp"
        }
    ]);


    return (
        <div>
            <p>Tinder Cards</p>
            <div className="tinderCards__cardContainer">
                {people.map((person)=>{
                    return <TinderCard className="swipe" key={person.name} preventSwipe={['up','down']}>
                        <div 
                        style={{backgroundImage: `url(${person.url})`}}
                        className="card">
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                })}
            </div>
        </div>
    )
}

export default TinderCards
