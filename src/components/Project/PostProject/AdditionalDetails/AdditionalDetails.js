import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

// import '../PrimaryDetails/PrimaryDetails.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    next: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#3F3D56",
    },
    prev: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#FFFFFF",
      color: "#000000",
      borderColor: "#000000"
    },
  }));
  

function AdditionalDetails(props) {
    const prevStep = (e) => {
        e.preventDefault();
        props.prevStep();
    }

    const { website, github, youtube } = props.userDetails;

    const classes = useStyles();
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Step 2 of 2
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="website"
                  type="url"
                  name="website"
                  variant="outlined"
                  required
                  fullWidth
                  id="website"
                  label="Live Link"
                  autoFocus
                  defaultValue={website}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required = "true"
                  fullWidth
                  id="github"
                  label="Github"
                  name="github"
                  autoComplete="github"
                  defaultValue={github}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="youtube"
                  label="Youtube"
                  name="youtube"
                  autoComplete="youtube"
                  defaultValue={youtube}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item justify="flex-start">
                <Button
                fullWidth
                variant="outlined"
                className={classes.prev}
                onClick = {prevStep}
                >
                Back
                </Button>
              </Grid>
              <Grid item justify="flex-start">
                <Button
                fullWidth
                type="submit"
                variant="contained"
                className={classes.next}
                onClick = {props.postProject}
                color="primary"
                >
                Submit
                </Button>
              </Grid>
            </Grid>  
          </form>
        </div>
      </Container>
    );
}

export default AdditionalDetails;