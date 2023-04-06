// import { useState } from "react";
import { 
  Link, 
  // useSubmit 
} from "react-router-dom";
import classes from "./EventItem.module.css";

// TODO: uncomment everything in order to active delete.
// also remove disabled from the delete button.

const EventItem = ({ event, eventId }) => {
  
  // const submit = useSubmit();
  // const [isDeletionStarted, setIsDeletionStarted] = useState(false);

  const startDeleteHandler = () => {
    console.log("You are not allowed to delete an item.");
    // setIsDeletionStarted(true);

    // if (isDeletionStarted) {
    //   submit(null, { method: "DELETE" });
    // }
  };

  return (
    <article className={classes.event}>
      <img src={event.img} alt={event.title} />
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <time>{event.date}</time>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler} disabled>
          {/* {isDeletionStarted ? "Sure?" : "Delete"} */}
          Delete
        </button>
      </menu>
    </article>
  );
};

export default EventItem;
