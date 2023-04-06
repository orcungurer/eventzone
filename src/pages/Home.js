import { useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";

const Home = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/events");
  };

  return (
    <PageContent title="Welcome">
      <p>Browse all our amazing events!</p>
      <button onClick={navigateHandler}>Go to Events</button>
    </PageContent>
  );
};

export default Home;