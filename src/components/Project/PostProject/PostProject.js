import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import AdditionalDetails from './AdditionalDetails/AdditionalDetails';
import PrimaryDetails from './PrimaryDetails/PrimaryDetails';
import { getProjectDetails } from "../../../services/projectService";
import { setProjectDetails } from "../../../actions/projectActions";

import './PostProject.css'

const axios = require("axios");

const PostProject = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();

    const [step, setStep] = useState(1);
    const dispatch = useDispatch();

    const projectsQueryType = useSelector((state) => state.projects.queryType);
	const allProjects = useSelector((state) => state.projects.projects);

    const [userDetails, setUserDetails] = useState({
        title: '',
        tagline: '',
        description: '',
        website: '',
        github: '',
        youtube: '',
    })

    const [imageState, setImageState] = useState({image: ''});

    const nextStep = () => {
        setStep(step+1);
    }
    const prevStep = () => {
        setStep(step-1);
    }
    const handleChange = (e) => {
        setUserDetails({ 
            ...userDetails,
            [e.target.name]: e.target.value })
    }

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          setImageState({
            image: event.target.files[0]
          });
          reader.readAsDataURL(event.target.files[0]);
        }
    }

    const postProject = (e) => {
        e.preventDefault();

        //  Form Validation
        let proceed = true;
        for(const key in userDetails) {
            if(key !== 'youtube' && key !== 'website' && userDetails[key] === '') proceed = false;
        }

        if(proceed && imageState.image !== '') {
            const formData = new FormData();
            formData.append('image', imageState.image);
            // formData.append('data', userDetails)
            for (const key in userDetails) {
                formData.append(key, userDetails[key]);
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            axios.post("/projects/", formData, config)
                .then((res) => {
                    getProjectDetails(res.data.project.id)
                        .then((data) => {
                            dispatch(setProjectDetails(allProjects, projectsQueryType, data));
                            alert("The file is successfully uploaded");
                            props.history.push(`/project/${res.data.project.id}`);
                        })
                        .catch((err) => console.log('ERROR', err));
    
                }).catch((error) => {
                    console.log(error);
                });
        }
        else {
            alert('No form values can be empty')
        }
    }

    switch(step) {
        case 1:
            return(
                <div className={classes.root} id="post-project-page">
                    <Grid container spacing={2} id='post-project-grid'>
                        <Grid item md={6} id="post-project-left">
                            <PrimaryDetails 
                                nextStep = {nextStep}
                                userDetails = {userDetails}
                                handleChange = {handleChange}
                                onImageChange = {onImageChange}
                                imageDetails = {imageState} 
                            />
                        </Grid>
                        <Grid item md={6} id="post-project-right">
                            <img id="post-project-ill" src={require("../../../assets/images/undraw_uploading_go67.svg").default} alt="Illustration" />
                        </Grid>
                    </Grid>
                </div>
            );
        case 2:
            return(
                <div className={classes.root} id="post-project-page">
                    <Grid container spacing={2} id='post-project-grid'>
                        <Grid item md={6} id="post-project-left">
                            <AdditionalDetails
                                nextStep = {nextStep}
                                prevStep = {prevStep}
                                userDetails = {userDetails}                
                                handleChange = {handleChange} 
                                postProject = {postProject}
                            />
                        </Grid>
                        <Grid item md={6} id="post-project-right">
                            <img id="post-project-ill" src={require("../../../assets/images/undraw_uploading_go67.svg").default} alt="Illustration" />
                        </Grid>
                    </Grid>
                </div>
            );
        default:
            (console.log('This is a multi-step form built with React.'))    
    }
}

export default withRouter(PostProject);