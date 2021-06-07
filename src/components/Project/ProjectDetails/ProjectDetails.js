import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Row, Item } from "@mui-treasury/components/flex";
import { Button } from "@material-ui/core";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import axios from "axios";

import "./ProjectDetails.css";
import { getProjectDetails } from "../../../services/projectService";
import { setProjectDetails } from "../../../actions/projectActions";

function ProjectDetails(props) {
    const useStyles = makeStyles((theme) => ({
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
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
    }));
    const styles = useStyles();

    const projectDetails = useSelector((state) => state.projects.projectDetails);
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

    const onCreatorClick = (id) => {
        props.history.push(`/user/${id}`);
    }

    return (
        <div id="project-details">
            <h1>{projectDetails.title}</h1>
            <br/>
            <Grid container spacing={3}>
				<Grid item md={8}>
                    <Box bgcolor={"#F4F7FA"} className={styles.box} borderRadius={8}>
                        <img id="img" className={styles.image} src={`/${projectDetails.image ? projectDetails.image.url : ''}`}  alt="" onError={() => {imageError()}}></img>
                    </Box>
                    <br/>
                    <Grid container spacing={3}>
                        <Grid style={{ display: "flex", alignItems: "center" }} item xs={8}>
                            <h3>{projectDetails.tagline}</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <Row>
                                <Item position={"right"}>
                                    <Button onClick={() => handleUpvoteClick(projectDetails.id)} variant="outlined" >
                                        <ArrowDropUpIcon />
                                        <Typography>{projectDetails.allVotes.length}</Typography>
                                    </Button>
                                </Item>
                            </Row>
                        </Grid>
                    </Grid>
                    <br/>
                    {/* <br/> */}
                    <p>{projectDetails.description}</p>
				</Grid>
                <Grid item  md={4}>
                    <ListItem alignItems="flex-start" style={{ paddingTop: 0 }}>
                        <ListItemAvatar style={{ marginTop: 0 }}>
                            <Avatar alt="Cindy Baker" src={projectDetails.user[0].profilePic.url}>{projectDetails.user[0].first_name ? projectDetails.user[0].first_name[0].toUpperCase() : projectDetails.user[0].username[0].toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            style={{ marginTop: -3 }}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        className={styles.inline}
                                        color="textPrimary"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => onCreatorClick(projectDetails.user[0].id)}
                                    >
                                        {projectDetails.user[0].first_name ? projectDetails.user[0].first_name + " " + projectDetails.user[0].last_name : projectDetails.user[0].username}
                                    </Typography>
                                    <Typography variant="body2">
                                        {projectDetails.user[0].bio ? projectDetails.user[0].bio : 'CREATOR'}
                                    </Typography>
                                </React.Fragment>
                        }
                        />
                    </ListItem>
				</Grid>
			</Grid>
            
        </div>
    )
}

export default withRouter(ProjectDetails);
