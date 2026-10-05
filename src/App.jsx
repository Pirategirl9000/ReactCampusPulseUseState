import './App.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import EventCard from "./components/EventCard.jsx";
import ClubCard from "./components/ClubCard.jsx";

import { useState } from 'react';

/**
 * A React Component that contains all the info about the page
 * @returns A parent component to all components of the webpage
 */
export default function App() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const events = [
    {
      id: 1,
      title: "Robotics Demonstration",
      category: "Technology",
      location: "Technology Center",
      date: "October 4, 2026",
      time: "5:00pm-6:00pm",
      description: "Join us for a demonstration of the new search and rescue robot"
    },
    {
      id: 2,
      title: "Jazz Concert",
      category: "Music",
      location: "Fine Arts Building",
      date: "September 30, 2026",
      time: "3:00pm-6:00pm",
      description: "Join Freddy and his friends in their jazz concert - free admissions"
    },
    {
      id: 3,
      title: "Student Coding Night",
      category: "Technology",
      location: "Innovation Lab",
      date: "October 7, 2026",
      time: "5:00pm-6:30pm",
      description: "Join ACM in their programming competition - any language allowed"
    },
    {
      id: 4,
      title: "Project Showcase",
      category: "Technology",
      location: "Gardner Hall 115",
      date: "October 1, 2026",
      time: "5:00pm-6:00pm",
      description: "Join ACM in showcasing your projects and seeing what your peers are working on"
    },
    {
      id: 5,
      title: "Fermat's Last Thereom Watch-Along",
      category: "Math",
      location: "Carhart G05",
      date: "October 8, 2026",
      time: "5:00pm-7:00pm",
      description: "Join the math club in discussing and watching a movie on Fermat's last theorem and it's eventual proof"  //https://en.wikipedia.org/wiki/Fermat%27s_Last_Theorem#:~:text=Cubum%20autem%20in,narrow%20to%20contain
    }
  ]

  const clubs = [
    {
      id: 1,
      name: "Cybersecurity Club",
      category: "Technology",
      meeting: "4:00pm-5:00pm Wednesdays",
      location: "CAT 207",
      description: "Connect with other cybersecurity students and develop a deeper understanding of the topic"
    },

    {
      id: 2,
      name: "Photography Club",
      category: "Arts",
      meeting: "7:00pm-8:00pm Wednesdays",
      location: "Peterson Fine Arts RM 011",
      description: "Join other students in learning new photography techniques"
    },

    {
      id: 3,
      name: "Running Club",
      category: "Athletics",
      meeting: "4:00pm-5:00pm Fridays",
      location: "Kanter Student Center Lobby",
      description: "Get together with other runners and joggers to enjoy the outdoors"
    },

    // When you can't write psuedodata just steal if from someone else (https://www.wsc.edu/directory/37/a-to-z/A)
    {
      id: 4,
      name: "Chess Club",
      category: "Recreation",
      meeting: "7:00pm-8:00pm Wednesdays",
      location: "Humanities Lounge",
      description: "Join other chess players and compete to get better at chess"
    },

    {
      id: 5,
      name: "Film Club",
      category: "Arts",
      meeting: "7:00pm-8:00pm Mondays",
      location: "Humanities Rm 408",
      description: "Join other film enthusiasts in watching and discussing various films"
    }
  ]

  /**
   * Compares two valuues and returns a number indicating which is first alphabetically (based on Arrays.sort())
   * @param {String} a the first element
   * @param {String} b the second element
   * @returns Number for use in Array.sort() method
   */
  function alphabetCompare(a, b) {
    if (a === b) return 0;

    for (let i = 0; i < a.length, i < b.length; i++) {
      if (a.charCodeAt(i) > b.charCodeAt(i)) return 1;  // b comes first
      else if (a.charCodeAt(i) < b.charCodeAt(i)) return -1  // a comes first

      // They are equal so we need to do another iteration
    }

    return (a.length > b.length) ? 1 : -1;  // Return which ever string is shorter
  }

  /**
   * Resets the search filters to their initial state
   */
  function resetFilters() {
    setSearchText("");
    setSelectedCategory("all");
  }



  // Filter the events by search query
  const filteredEvents = events.filter(event => {

    // Check the category filter
    const categoryMatch = selectedCategory === "all" || event.category === selectedCategory;
    if (!categoryMatch) return false;   // We can leave early since the category doesn't match
    else if (!searchText) return true;  // They don't have a search query

    const searchQueries = searchText.toLowerCase().split("&");  // & is used to combine search queries

    for (const query of searchQueries) {
      if (
        !event.title.toLowerCase().includes(query) &&
        !event.category.toLowerCase().includes(query) &&
        !event.location.toLowerCase().includes(query) &&
        !event.description.toLowerCase().includes(query)
      ) return false;
    }

    // Both the queries and category match
    return true;
  });

    const pluralEvents = filteredEvents.length > 1 || filteredEvents.length === 0;  // When we have 0 events we say there 'are' 0 'events'

    const uniqueCategories = events.map(event => event.category)                                 //  Map each event to its category
      .filter((value, index, array) => array.length < 10 && array.indexOf(value) === index)      //  Filter unique categories and limit to 10 categories

  return (
    <>
    <Header />

    <main className="content-section">

      <div className="section-heading">
        <h2 id="events" className="events-header">Upcoming Events</h2>
        <p id="events-subheader">There {(pluralEvents) ? "are" : "is"} {filteredEvents.length} upcoming {(pluralEvents) ? "events" : "event"}</p>
      </div>

      <input className="event-search-filter" type="search" placeholder="Search Events" value={searchText} onChange={e => {setSearchText(e.target.value)}}/>

      <select className="event-category-filter" value={selectedCategory} onChange={e => {setSelectedCategory(e.target.value)}}>
        <option value="all" key="all">All Categories</option>

        {/* We map each unique category up to 10 to an option */}
        {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <button className="reset-filter-button" onClick={resetFilters}>Reset Filters</button>

      {filteredEvents.length === 0 ? (<p>No events match your search</p>) : (<section className="event-grid">
          {
          filteredEvents
            .sort((a, b) => alphabetCompare(a.title, b.title))  // Sort them by title ascending
            .map(event => <EventCard key={event.id} event={event}/>)  // Map them to an eventCard
          }
      </section>)}


      <div className="section-heading">
        <h2 id="clubs" className="clubs-header">Campus Clubs</h2>
        <p id="clubs-subheader">{(clubs.length > 1) ? "Join one of our many clubs and get involved on campus" : "Join our club or start one of your own"}</p>
      </div>

      <section className="club-grid">
        {
        clubs.sort((a, b) => alphabetCompare(a.name, b.name))       // Sort them by club name asc
        .map(club => <ClubCard key={club.id} club={club}/>)          // Map them to club cards
        }
      </section>


    </main>

    <Footer />

    </>
  );
}