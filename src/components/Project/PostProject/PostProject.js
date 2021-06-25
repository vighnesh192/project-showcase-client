import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AdditionalDetails from './AdditionalDetails/AdditionalDetails';
import PrimaryDetails from './PrimaryDetails/PrimaryDetails';
import { getProjectDetails } from "../../../services/projectService";
import { setProjectDetails } from "../../../actions/projectActions";

const axios = require("axios");

const PostProject = (props) => {
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
        //   reader.onload = (e) => {
        //     setImageState({
        //         image: e.target.result
        //     });
        //     console.log('IMAGE:-', reader)
        //     console.log('FILE', event.target.files[0])
        //   };
          reader.readAsDataURL(event.target.files[0]);
          console.log(imageState);
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
                <PrimaryDetails 
                    nextStep = {nextStep}
                    userDetails = {userDetails}
                    handleChange = {handleChange}
                    onImageChange = {onImageChange}
                    imageDetails = {imageState} 
                />
            );
        case 2:
            return(
                <AdditionalDetails
                    nextStep = {nextStep}
                    prevStep = {prevStep}
                    userDetails = {userDetails}                
                    handleChange = {handleChange} 
                    postProject = {postProject}
                />
            );
        // case 3:
        //     return(
        //         <Confirm 
        //         prevStep = {prevStep}
        //         userDetails = {userDetails} 
        //         />
        //     );
        default:
            (console.log('This is a multi-step form built with React.'))    
    }
}

export default withRouter(PostProject);