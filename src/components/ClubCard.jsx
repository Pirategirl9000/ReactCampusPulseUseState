import { useState } from 'react';

/**
 * Returns a React component for a card element containing information about a club object
 * @param {Object} club The club object containing the listed properties
 * @param {String} club.name The name of the club
 * @param {String} club.category The category of the club
 * @param {String} club.meeting The meeting time and days of the week for the club MONTH_NAME DD, YYYY : START_TIMEpm|am-END_TIMEpm|am
 * @param {String} club.location The location of club meetings
 * @param {String} club.description The description of the club 
 * @returns {React.JSX.Component} ClubCard React component
 */
export default function ClubCard( {club} ) {
    const [favorite, setFavorite] = useState(false);

    /**
     * Toggles the state of favorite for this club
     */
    function toggleFavorite() {
        setFavorite(!favorite);
    }

    /**
     * Handles click of the learn more button by displaying info about the club
     */
    function handleClick() {
            alert(`${club.name} \n
             Type: ${club.category} \n
             Time/Day: ${club.meeting} \n
             Location: ${club.location} \n
             Description: ${club.description}`);
    }

    return (
        <article className="club-card">
            <h2 className="club-name">{club.name}</h2>
            <p className="club-category">{club.category}</p>
            <p className="club-meetings">Meetings: {club.meeting}</p>
            <p className="club-location">Location: {club.location}</p>
            <p className="club-description"> {club.description} </p>
            <button className="club-button" onClick={handleClick}>Learn More</button>
            <button onClick={toggleFavorite} className="favorite-club-button">{favorite ? "★Favorite" : "☆Add Favorite"}</button>
        </article>
    )
}