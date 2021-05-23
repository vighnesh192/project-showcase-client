import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import './PrimaryDetails.css'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(12),
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
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#3F3D56",
    },
    imgPreview: {
      width: '300px',
      height: '250px'
    }
  }));
  
function PrimaryDetails (props) {
    const classes = useStyles();

    const nextStep = (e) => {
        e.preventDefault();
        props.nextStep();
    }

    const { tagline, description, title } = props.userDetails;
    const { image } = props.imageDetails;
    console.log('image state:-', image)
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Step 1 of 2
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  autoComplete="Title"
                  defaultValue={title}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="tagline"
                  label="Tagline"
                  type="tagline"
                  id="tagline"
                  autoComplete="current-tagline"
                  defaultValue={tagline}
                  onChange={props.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  type="description"
                  id="description"
                  autoComplete="current-description"
                  defaultValue={description}
                  onChange={props.handleChange}
                />
              </Grid>
              <input type="file" hidden onChange={props.onImageChange}  id="image-input"/>
              <label htmlFor="image-input">
                <Button variant="raised" component="span" >
                  Upload  
                </Button>
              </label>
              <br /> 
              <img id="img-output" className={classes.imgPreview} src={image}/>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={nextStep}
            >
              Next
            </Button>
          </form>
        </div>
      </Container>
    );
  }


export default PrimaryDetails;