import { json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

// const dummyEvents = [
//   {
//     id: "e1",
//     title: "LoFi and Work",
//     date: "2023-03-14",
//     img: "https://images2.alphacoders.com/125/1257405.jpg",
//   },
//   {
//     id: "e2",
//     title: "Art Gallery",
//     date: "2023-03-15",
//     img: "https://www.culturepartnership.eu/upload/news/5e3419b1d5feb.jpg",
//   },
// ];

const Events = () => {
  const data = useLoaderData();
  
  const loadedEvents = [];
  
  for (const key in data) {
    loadedEvents.push({
      id: key,
      title: data[key].title,
      date: data[key].date,
      img: data[key].img,
      description: data[key].description,
    });
  }

  return <EventsList events={loadedEvents} />;
};

export default Events;

export const loader = async () => {
  const response = await fetch("https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/events.json");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      { status: 500 },
    );
  }
  
  return response;
};