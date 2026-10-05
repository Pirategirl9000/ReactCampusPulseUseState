import { useState } from 'react';

/**
 * React Component that creates a card for a given event prop
 * @param {Object} event The event object containing all the info for displaying on the card
 * @param {String} event.title The title of the event
 * @param {String} event.category The category of the event
 * @param {String} event.date The date the event takes place MONTH_NAME DD, YYYY
 * @param {String} event.time The time the event takes place HH:MM(pm|am)-HH:MM(pm|am)
 * @param {String} event.description The description for this event
 * @returns {React.JSX.Component} EventCard React component
 */
export default function EventCard({ event }) {
    const [favorite, setFavorite] = useState(false);

    /**
     * Toggles the state of favorite for this event
     */
    function toggleFavorite() {
        setFavorite(!favorite);
    }

    /**
     * Handles clicks for the View Event button by displaying info about the event in an alert message
     */
    function handleClick() {
        alert(`${event.title} \n
             Type: ${event.category} \n
             Date: ${event.date} \n
             Time: ${event.time} \n
             Description: ${event.description}`);
    }

    return (
        <article className="event-card">
            <h2 className="event-title"> {event.title} </h2>
            <p className="event-category"> Category: {event.category} </p>
            <p className="event-location"> Location: {event.location} </p>
            <p className="event-date-time"> {event.date} : {event.time} </p>
            <p className="event-desc"> {event.description} </p>
            <button onClick={handleClick} className="event-button"> View Event </button>
            <button onClick={toggleFavorite} className="favorite-button"> {favorite ? "★Favorite" : "☆Add Favorite"} </button>
        </article>
    );
}