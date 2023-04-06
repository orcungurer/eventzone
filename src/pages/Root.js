import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Root = () => {
  return (
    <Fragment>
      <MainNavigation />
      <Outlet />
    </Fragment>
  );
};

export default Root;