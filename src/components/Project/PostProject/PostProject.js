import React, { useState } from 'react';
import AdditionalDetails from './AdditionalDetails/AdditionalDetails';
import PrimaryDetails from './PrimaryDetails/PrimaryDetails';
const axios = require("axios");

function PostProject() {
    const [step, setStep] = useState(1);
    
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
        }
    }

    const postProject = (e) => {
        e.preventDefault();
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
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
                console.log(error);
            });
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

export default PostProject;