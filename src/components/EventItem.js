import { useState } from "react";
import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

const EventItem = ({ event, eventId }) => {
  const submit = useSubmit();
  const [isDeletionStarted, setIsDeletionStarted] = useState(false);

  const startDeleteHandler = () => {
    setIsDeletionStarted(true);

    if (isDeletionStarted) {
      submit(null, { method: "DELETE" });
    }
  };

  return (
    <article className={classes.event}>
      <img src={event.img} alt={event.title} />
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <time>{event.date}</time>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>
          {isDeletionStarted ? "Sure?" : "Delete"}
        </button>
      </menu>
    </article>
  );
};

export default EventItem;
