import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Row, Item } from "@mui-treasury/components/flex";
import { Button } from "@material-ui/core";

import axios from "axios";

import "./ProjectDetails.css";
import { getProjectDetails } from "../../../services/projectService";
import { setProjectDetails } from "../../../actions/projectActions";

function ProjectDetails() {
    const useStyles = makeStyles(() => ({
        card: {
            border: "2px solid",
            borderColor: "#E7EDF3",
            borderRadius: 16,
            transition: "0.4s",
            "&:hover": {
                borderColor: "#5B9FED",
            },
        },
        image: {
            height: "100%",
            width: "100%",
            borderRadius: 8
        },
        noImage: {
            display: 'none'
        },
        box: {
            minWidth: "52vw",
            minHeight: "42vh"
        }
    }));
    const styles = useStyles();

    const projectDetails = useSelector((state) => state.projects);
    const allProjects = useSelector((state) => state.projects.projects);
    const projectsQueryType = useSelector((state) => state.projects.queryType);
    const dispatch = useDispatch();

    console.log('PROJECT DETAILS', projectDetails);

    const imageError = () => {
        const image = document.getElementById('img');
        image.style.display = 'none' ;
    }

    const handleUpvoteClick = (projectId) => {
		axios.post(`/projects/vote`, { project: projectId })
			.then((res) => {
                console.log('RESPONSE', res);
                getProjectDetails(projectId)
                    .then((data) => {
                        console.log('DATA', data)
                        dispatch(setProjectDetails(allProjects, projectsQueryType, data));
                    })
			})
	}

    return (
        <div id="project-details">
            <h1>{projectDetails.projectDetails.title}</h1>
            <br/>
            <Grid container spacing={3}>
				<Grid item md={8}>
                    <Box bgcolor={"#F4F7FA"} className={styles.box} borderRadius={8}>
                        <img id="img" className={styles.image} src={`/${projectDetails.projectDetails.image ? projectDetails.projectDetails.image.url : ''}`}  alt="" onError={() => {imageError()}}></img>
                    </Box>
                    <br/>
                    <Grid container spacing={3}>
                        <Grid style={{ display: "flex", alignItems: "center" }} item xs={8}>
                            <h3>{projectDetails.projectDetails.tagline}</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <Row>
                                <Item position={"right"}>
                                    <Button onClick={() => handleUpvoteClick(projectDetails.projectDetails.id)} variant="outlined" >
                                        <ArrowDropUpIcon />
                                        <Typography>{projectDetails.projectDetails.allVotes.length}</Typography>
                                    </Button>
                                </Item>
                            </Row>
                        </Grid>
                    </Grid>
                    <br/>
                    {/* <br/> */}
                    <p>{projectDetails.projectDetails.description}</p>
				</Grid>
                <Grid item  md={4}>
					<div></div>
				</Grid>
			</Grid>
            
        </div>
    )
}

export default ProjectDetails;
