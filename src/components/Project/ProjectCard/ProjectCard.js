import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Row, Column, Item } from "@mui-treasury/components/flex";
import { Button } from "@material-ui/core";
import axios from "axios";
import { withRouter } from 'react-router-dom';

import { getProjectDetails, getProjects, getProjectsByUser } from "../../../services/projectService";
import { setProjectDetails, setProjects } from "../../../actions/projectActions";
import { getTopCreators } from "../../../services/userService";
import { setTopCreators } from "../../../actions/userActions";

const useBasicProfileStyles = makeStyles(({ palette }) => ({
	avatar: {
		borderRadius: 8,
		backgroundColor: "#495869",
		position: "static",
	},
	overline: {
		fontSize: 10,
		textTransform: "uppercase",
		letterSpacing: 1,
		color: "#8D9CAD",
	},
	name: {
		fontSize: 14,
		fontWeight: 500,
		color: "#495869",
	},
	upvoteButton: {
		borderRadius: "10%",
		borderColor: "#E7EDF3",
		color: "#8D9CAD"
	}
}));

const BasicProfile = withRouter((props) => {
	const styles = useBasicProfileStyles();
	const projectState = useSelector((state) => state.projects);
	const dispatch = useDispatch();

	console.log('PROPS', props)

	const handleUpvoteClick = (projectId) => {
		axios.post(`/projects/vote`, { project: projectId })
			.then((res) => {
				if(props.from === 'MainPage') {
					getProjects(projectState.queryType ? projectState.queryType : 'popular')
						.then(data => {
							dispatch(setProjects(data, props.projectsQueryType));
						});
				}
				else {
					getProjectsByUser(props.profile.id)
						.then(data => {
							dispatch(setProjects(data, props.projectsQueryType));
						});
				}

				getTopCreators()
					.then(data => {
						dispatch(setTopCreators(data));
					})
			})
	}

	const onCreatorClick = (id) => {
		props.history.push(`/user/${id}`);
	}
	
	return (
		<Row {...props}>
			<Item>
				<Avatar onClick={() => onCreatorClick(props.profile.id)} style={{cursor : 'pointer'}} src={props.profile.profilePic ? props.profile.profilePic.url : ''} className={styles.avatar}>{props.profile ? props.profile.username ? props.profile.username[0].toUpperCase() : props.profile.first_name[0].toUpperCase() : ""}</Avatar>
			</Item>
			<Item onClick={() => onCreatorClick(props.profile.id)} position={"middle"} pl={{ sm: 0.5, lg: 0.5 }} style={{cursor : 'pointer'}}>
				<Typography className={styles.overline}>CREATOR</Typography>
				<Typography className={styles.name}>{props.profile ? props.profile.username ? props.profile.username : props.profile.first_name + " " + props.profile.last_name : ""}</Typography>
			</Item>
			<Item position={"right"}>
				<Button variant="outlined" style={{cursor : 'pointer'}} className={styles.upvoteButton} onClick={() => handleUpvoteClick(props.projectsQueryType !== 'new' ? props.project.project : props.project.id) }>
					<ArrowDropUpIcon />
					<Typography>{props.project.allVotes.length}</Typography>
				</Button>
			</Item>
		</Row>
	);
});

const useCardHeaderStyles = makeStyles(() => ({
	root: { paddingBottom: 0 },
	title: {
		fontSize: "1.25rem",
		color: "#122740",
	},
	subheader: {
		fontSize: "0.875rem",
		color: "#495869",
	},
}));

const CardHeader = withRouter((props) => {
	const styles = useCardHeaderStyles();

	const handleProjectCardClick = (id) => {
		props.history.push(`/project/${id}`);
    }

	return (
		<Row {...props}>
			<Item 
				position={"middle"}
				onClick={() => handleProjectCardClick(props.project.id)} 
				style={{cursor : 'pointer'}}
			>
				<Typography className={styles.title}>
					<b>{props.project ? props.project.title : ""}</b>
				</Typography>
				<Typography className={styles.subheader}>
					{props.project ? props.project.tagline : ""}
				</Typography>
			</Item>
			
		</Row>
	);
});

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
		height: "160px",
		width: "100%",
		borderRadius: 8
	},
	noImage: {
		display: 'none'
	}
}));

const imageError = (id) => {
	const imgId = `project-image-${id}`;
	const image = document.getElementById(imgId);
	image.style.display = 'none' ;
}

export const ProjectCard = React.memo(function ShowcaseCard(props) {
	const styles = useStyles();
	const dispatch = useDispatch();
	const gap = { xs: 1, sm: 1.5, lg: 2 };
	const projectsQueryType = useSelector((state) => state.projects.queryType);
	const allProjects = useSelector((state) => state.projects.projects);

	console.log('PROJECT CARD PROPS', props)

	const handleProjectCardClick = (id) => {
        getProjectDetails(id)
            .then((data) => {
				dispatch(setProjectDetails(allProjects, projectsQueryType, data));
				props.history.push(`/project/${id}`);
            })
    }

	return (
		<Grid item xs={12} sm={12} md={props.from === 'MainPage' ? 6 : 4}
		>
			<Column
				className={styles.card}
				p={{ xs: 0.5, sm: 0.75, lg: 1 }}
				gap={gap}
			>
				<CardHeader project={projectsQueryType !== "new" ? props.project.proj : props.project}/>
				<Item 
					onClick={() => handleProjectCardClick(projectsQueryType !== 'new' ? props.project.project : props.project.id)} 
					style={{cursor : 'pointer'}}
				>
					{ 
						props.project.image == null 
						? 
						<Box minHeight={160} maxHeight={160} bgcolor={"#F4F7FA"} borderRadius={8}/>
						: 
						<Box minHeight={160} maxHeight={160} bgcolor={"#F4F7FA"} borderRadius={8}>
							{
								projectsQueryType !== "new" ? 
								<img id={`project-image-${props.project.project}`} className={styles.image} src={`/${props.project.image.url}`} onError={() => {imageError(props.project.project)}} alt=""></img> 
								:
								<img id={`project-image-${props.project.id}`} className={styles.image} src={`/${props.project.image.url}`} onError={() => {imageError(props.project.id)}} alt=""></img> 						
							}	
						</Box>
					}
				</Item>
				<BasicProfile from={props.from} profile={props.project.user ? props.project.user[0] : []} project={props.project} projectsQueryType={projectsQueryType}/>
			</Column>
		</Grid>
	);
});
export default withRouter(ProjectCard);
