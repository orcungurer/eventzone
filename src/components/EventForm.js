import classes from "./EventForm.module.css";
import { Form, json, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";

const EventForm = ({ method, event }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const data = useActionData();

  const cancelHandler = () => {
    navigate("..");
  };

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((error) => (
            <li key={{ error }}>{error}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input 
          id="title"
          type="text"
          name="title"
          defaultValue={event ? event.title : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input 
          id="image"
          type="url"
          name="image"
          defaultValue={event ? event.img : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input 
          id="date"
          type="date"
          name="date"
          defaultValue={event ? event.date : ""}
          required
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description"
          rows="5"
          name="description"
          defaultValue={event ? event.description : ""}
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
};

export default EventForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const method = request.method;

  const eventData = {
    title: data.get("title"),
    img: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/events.json";

  if (method === "PATCH") {
    url = `https://react-http-abb38-default-rtdb.europe-west1.firebasedatabase.app/events/${params.eventId}.json`;
  }

  const response = await fetch(url, {
    method: method,
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw json(
      { message: "Could not save event" },
      { status: 500 },
    );
  }

  return redirect("/events");
};