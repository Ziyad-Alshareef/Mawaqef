import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

export default function Logintwo(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return (<div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5"> <div ><div id="radius-shape-1" ><h1 class="my-5 display-5 fw-bold ls-tight">The best offer <br /></h1><p>ab ipsum nisi dolorem modi. Quos?</p></div><div ><div></div><div></div><div><div><form method="POST" action="signin.php"><div ><input type="email"  name="email" placeholder="Email address"/></div><div><input type="password"  name="password" placeholder="Password" /></div><button type="submit" name="submit">Sign in</button><div><p>Don't have an account? <a href="signup.php">Sign Up</a></p></div></form></div></div></div></div></div>);
  }

  function createInfo() {
    return "Create page";
  }

  useEffect(() => {
    console.log("ran");
    return () => console.log("cleanup");
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is House Party?
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}


