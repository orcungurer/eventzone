import { Fragment } from "react";
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  
  let title= "An error occured!";
  let message= "Something went wrong."

  if (error.status === 500) {
    message = error.data.message;
  }
  
  if (error.status === 404) {
    title= "Not found!";
    message= "Could not find the page.";
  }
  
  return (
    <Fragment>
      <MainNavigation />
      <PageContent title={title}>
        {message}
      </PageContent>
    </Fragment>
  );
};

export default Error;