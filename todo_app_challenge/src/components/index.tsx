import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Login from "./Login";

const useStyles = makeStyles({
  root: {
    display: "flex",

    textAlign: "center",
    height: "100%",
  },
});
const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Login />
    </div>
  );
};
export default Home;
