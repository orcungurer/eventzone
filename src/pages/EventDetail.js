import { Fragment, Suspense } from "react";
import { useRouteLoaderData, useParams, defer, Await, json, redirect } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetail = () => {
  const params = useParams();
  // we fetch events using loader and pass the id we defined in App as argument, 
  // then, we pass event to EventItem, events to EventsList.
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <Fragment>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} eventId={params.eventId} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </Fragment>
  );
};

export default EventDetail;

const loadEvent = async (id) => {
  const response = await fetch("https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/events.json");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch the selected event details." },
      { status: 500 },
    );
  }

  // return response;
  const responseData = await response.json();

  let loadedEvent = {};
  
  for (const key in responseData) {
    if (key === id) {
      loadedEvent = {
        id: key,
        title: responseData[key].title,
        date: responseData[key].date,
        img: responseData[key].img,
        description: responseData[key].description,
      };
    }
  }
  
  return loadedEvent;
};

const loadEvents = async () => {
  const response = await fetch("https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/events.json");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch the events." },
      { status: 500 },
    );
  }

  // return response; // because we are not in loader anymore.
  const responseData = await response.json();

  const loadedEvents = [];

  for (const key in responseData) {
    loadedEvents.push({
      id: key,
      title: responseData[key].title,
      date: responseData[key].date,
      img: responseData[key].img,
      description: responseData[key].description,
    });
  }

  return loadedEvents;
};

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id),
    events: loadEvents(),
  });
};

export const action = async ({ request, params }) => {
  const eventId = params.eventId;
  const url = `https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/events/${eventId}.json`;

  const response = await fetch(url, {
    method: request.method
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete the item." },
      { status: 500 },
    );
  }

  return redirect("/events");
};