import React, { useRef, useState } from 'react';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green, grey } from '@material-ui/core/colors';

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

    const ColorButton = withStyles((theme) => ({
      root: {
        color: "#434E5C",
        backgroundColor: grey[250],
      },
    }))(Button);

    const nextStep = (e) => {
        e.preventDefault();
        props.nextStep();
    }

    const [image, setImage] = useState({image: '', imageDetails: ''})

    const onImageChange = (event) => {
      console.log('EVENT', event)
      if (event.target.files && event.target.files[0]) {
        // if(event.target.files[0].size < 500) {
          props.onImageChange(event);
          let reader = new FileReader();
          reader.onload = (e) => {
            setImage({image: e.target.result, imageDetails: event.target.files[0]});
            document.getElementById('done-icon').style.display = 'block'
          };
          reader.readAsDataURL(event.target.files[0]);
        // }
        // else alert('File size cannot be greater than 500KB');
      }
    }

    const onChooseImageClick = () => {
      imageInput.current.click();
    }

    const { tagline, description, title } = props.userDetails;
    // const { image } = props.imageDetails.image;

    const imageInput = useRef( null );
  
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
                  required = "true"
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
              <input ref={imageInput} type="file" hidden onChange={(e) => onImageChange(e)} id="image-input"/>
              <div id='image-upload-section'>
                <label htmlFor="image-input" style={{marginTop: '8px', marginLeft: '8px'}}>
                  <ColorButton onClick={onChooseImageClick}>
                    Chose Image  
                  </ColorButton>
                </label>
                <p style={{display: 'flex', alignItems: 'center', marginTop: '8px', marginLeft: '6px'}}>{image.imageDetails.name}</p>
                <CheckCircleOutlineIcon id='done-icon' style={{ color: green[800], display: 'none' }}/>
              </div>
              <br /> 
              {/* <img id="img-output" className={classes.imgPreview} src={image.image} alt=""/> */}
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