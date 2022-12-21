import React from "react";
import { Grid, TextField, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "./Header";
const LoginPage = () => {
  return (
    <div style={{ padding: 30 }}>
      <Header />
      <Paper>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField label="Usuario"></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Contraseña" type={"password"}></TextField>
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Button variant="outlined" fullWidth>
              <Link to={"/main"}>Ingresar</Link>
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginPage;
