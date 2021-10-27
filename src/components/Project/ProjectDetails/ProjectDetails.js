import React, { useEffect, useState } from 'react';
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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import axios from "axios";

// import Disqus from "disqus-react";

import "./ProjectDetails.css";
import { getProjectDetails } from "../../../services/projectService";
import { setProjectDetails } from "../../../actions/projectActions";

// import CommentSection from "../CommentSection/CommentSection"

function ProjectDetails(props) {

    const dispatch = useDispatch();

    const projectDetails = useSelector((state) => state.projects.projectDetails);
    const allProjects = useSelector((state) => state.projects.projects);
    const projectsQueryType = useSelector((state) => state.projects.queryType); 

    const [upvoted, setUpvoted] = useState(false);

    useEffect(() => {
        let mounted = true;
        if(mounted) {
            getProjectDetails(props.match.params.projectId)
            .then((data) => {
				dispatch(setProjectDetails(allProjects, projectsQueryType, data));
                if(localStorage.getItem('User')) {
                    let found = data.allVotes.find((vote, index) => {
                            if(vote.votedBy === JSON.parse(localStorage.getItem('User')).id) {
                                return true;
                            }
                            return false;
                    })
                    if(found) {
                        setUpvoted(true);
                    }
                    else {
                        setUpvoted(false);
                    }
                }
            })
			.catch((err) => console.log('ERROR', err))
        }
        return () => {
          mounted = false;
        }
    }, [upvoted]);   

    const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/project' : 'https://projstemp.herokuapp.com/project';

    const disqusShortname = "projectshowcase"
    const disqusConfig = {
      url: projectDetails ? `${url}/${projectDetails.id}` : '',
      identifier: projectDetails ? projectDetails.id : '',
      title: "Project Showcase"
    }
    
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
            width: "100%",
            minHeight: "52vh",
            maxHeight: "100vh",
            borderRadius: 8
        },
        noImage: {
            display: 'none'
        },
        box: {
            minWidth: "20vw",
            minHeight: "42vh",
            maxHeight: "100vh"
        },
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        inline: {
            display: 'inline',
        },
        notUpvotedButton: {
            borderRadius: "10%",
            borderColor: "#E7EDF3",
            color: "#8D9CAD"
        },
        upvotedButton: {
            borderRadius: "10%",
            borderColor: "#E7EDF3",
            backgroundColor: "#0000000a",
            color: "#8D9CAD"
        }
    }));
    const styles = useStyles();

    const theme = createMuiTheme({
		overrides: {
		  // Style sheet name ⚛️
		  MuiSvgIcon: {
			// Name of the rule
			colorPrimary: {
			  // Some CSS
			  color: '#8D9CAD',
			},
			colorSecondary: {
			  // Some CSS
			  color: '#5b6065',
			},
		  },
		},
	  });

    const imageError = () => {
        const image = document.getElementById('img');
        image.style.display = 'none' ;
    }

    const handleUpvoteClick = (projectId) => {
		axios.post(`/projects/vote`, { project: projectId })
			.then((res) => {
                getProjectDetails(projectId)
                    .then((data) => {
                        let found = data.allVotes.find((vote, index) => {
                            if(vote.votedBy === JSON.parse(localStorage.getItem('User')).id) {
                                return true;
                            }
                            return false;
                        })
                        if(found) {
                            setUpvoted(true);
                        }
                        else {
                            setUpvoted(false);
                        }
                        dispatch(setProjectDetails(allProjects, projectsQueryType, data));
                    })
			})
	}

    const onCreatorClick = (id) => {
        props.history.push(`/user/${id}`);
    }

    return (
        <div id="project-details">
            <h1>{projectDetails ? projectDetails.title : ''}</h1>
            <br/>
            <Grid container spacing={3}>
				<Grid item md={8}>
                    <Box bgcolor={"#F4F7FA"} className={styles.box} borderRadius={8}>
                        {
                            projectDetails 
                            ?
                            <img id="img" className={styles.image} src={process.env.NODE_ENV === 'production' ? projectDetails.image.url : `/${projectDetails ? projectDetails.image ? projectDetails.image.url : '' : ''}`}  alt="" onError={() => {imageError()}}></img>
                            :
                            ''
                        }
                    </Box>
                    <br/>
                    <Grid container spacing={3}>
                        <Grid style={{ display: "flex", alignItems: "center" }} item xs={8}>
                            <h3>{projectDetails ? projectDetails.tagline : ''}</h3>
                        </Grid>
                        <Grid item xs={4}>
                            <Row>
                                <Item position={"right"}>
                                    <ThemeProvider theme={theme}>
                                        <Button onClick={() => handleUpvoteClick(projectDetails.id)} variant="outlined" className={upvoted ? styles.upvotedButton : styles.notUpvotedButton}>
                                            <ArrowDropUpIcon color={upvoted ? 'secondary' : 'primary'}/>
                                            <Typography style={{color: upvoted ? '#5b6065' : '#8D9CAD'}}>{projectDetails ? projectDetails.allVotes.length : ''}</Typography>
                                        </Button>
                                    </ThemeProvider>
                                </Item>
                            </Row>
                        </Grid>
                    </Grid>
                    <br/>
                    {/* <br/> */}
                    <p>{projectDetails ? projectDetails.description : ''}</p>
				</Grid>
                <Grid item  md={4}>
                    <ListItem alignItems="flex-start" style={{ paddingTop: 0 }}>
                        <ListItemAvatar style={{ marginTop: 0 }}>
                            <Avatar alt="Cindy Baker" src={projectDetails ? projectDetails.user[0].profilePic.url : ''}>{projectDetails ? projectDetails.user[0].first_name ? projectDetails.user[0].first_name[0].toUpperCase() : projectDetails.user[0].username[0].toUpperCase() : ''}</Avatar>
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
                                        onClick={() => onCreatorClick(projectDetails ? projectDetails.user[0].id : '')}
                                    >
                                        {projectDetails ? projectDetails.user[0].first_name ? projectDetails.user[0].first_name + " " + projectDetails.user[0].last_name : projectDetails.user[0].username : ''}
                                    </Typography>
                                    <Typography variant="body2">
                                        {projectDetails ? projectDetails.user[0].bio ? projectDetails.user[0].bio : 'CREATOR' : ''}
                                    </Typography>
                                </React.Fragment>
                        }
                        />
                    </ListItem>
				</Grid>
			</Grid>
            <br />
            <br />
            <hr style={{ borderTop: "1px" }}/>
            <br />
            <br />
            {/* <Disqus.DiscussionEmbed
                shortname={disqusShortname}
                config={disqusConfig}
            /> */}
            
        </div>
    )
}

export default withRouter(ProjectDetails);
