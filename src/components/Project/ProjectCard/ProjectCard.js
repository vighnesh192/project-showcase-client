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

import { getProjects } from "../../../services/projectService";
import { setProjects } from "../../../actions/projectActions";
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

const BasicProfile = (props) => {
	const styles = useBasicProfileStyles();
	console.log('PROFILE:-', props);
	const projectState = useSelector((state) => state.projects);
	const dispatch = useDispatch();

	const handleUpvoteClick = (projectId) => {
		axios.post(`/projects/vote`, { project: projectId })
			.then((res) => {
				console.log(res);
				getProjects(projectState.queryType ? projectState.queryType : 'popular')
					.then(data => {
						console.log('PROJECT STATE AFTER UPVOTE:-', data);
						dispatch(setProjects(data, props.projectsQueryType));
					});

				getTopCreators()
					.then(data => {
						dispatch(setTopCreators(data));
					})
			})
	}
	
	return (
		<Row {...props}>
			<Item>
				<Avatar src={props.profile.profilePic ? props.profile.profilePic.url : ''} className={styles.avatar}>{props.profile ? props.profile.username ? props.profile.username[0].toUpperCase() : props.profile.first_name[0].toUpperCase() : ""}</Avatar>
			</Item>
			<Item position={"middle"} pl={{ sm: 0.5, lg: 0.5 }}>
				<Typography className={styles.overline}>CREATOR</Typography>
				<Typography className={styles.name}>{props.profile ? props.profile.username ? props.profile.username : props.profile.first_name + " " + props.profile.last_name : ""}</Typography>
			</Item>
			<Item position={"right"}>
				<Button variant="outlined" className={styles.upvoteButton} onClick={() => handleUpvoteClick(props.projectsQueryType != 'new' ? props.project.project : props.project.id) }>
					<ArrowDropUpIcon />
					<Typography>{props.project.allVotes.length}</Typography>
				</Button>
			</Item>
		</Row>
	);
};

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

const CardHeader = (props) => {
	const styles = useCardHeaderStyles();
	console.log("HEADER:-", props);
	return (
		<Row {...props}>
			<Item position={"middle"}>
				<Typography className={styles.title}>
					<b>{props.project ? props.project.title : ""}</b>
				</Typography>
				<Typography className={styles.subheader}>
					{props.project ? props.project.description : ""}
				</Typography>
			</Item>
			
		</Row>
	);
};

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
	}
}));

const imageError = (id) => {
	console.log(id)
	const imgId = `project-image-${id}`;
	const image = document.getElementById(imgId);
	console.log('IMAGE' ,image)
	image.style.display = 'none' ;
}

export const ProjectCard = React.memo(function ShowcaseCard(props) {
	const styles = useStyles();
	const gap = { xs: 1, sm: 1.5, lg: 2 };
	const projectsQueryType = useSelector((state) => state.projects.queryType);
	// console.log('QUERY STATE:-', projectsQueryType);
	console.log('PROJECT CARD:-', props.project);
	// props.project.image != null ?
	// console.log(`IMAGE URL:- /${props.project.image.url}`) :
	// console.log('IMAGE URL:- null')
	return (
		<Grid item xs={12} sm={6}>
			<Column
				className={styles.card}
				p={{ xs: 0.5, sm: 0.75, lg: 1 }}
				gap={gap}
			>
				<CardHeader project={projectsQueryType !== "new" ? props.project.proj : props.project}/>
				<Item>
					{ 
						props.project.image == null 
						? 
						<Box minHeight={160} bgcolor={"#F4F7FA"} borderRadius={8}/>
						: 
						<Box minHeight={160} bgcolor={"#F4F7FA"} borderRadius={8}>
							{
								projectsQueryType !== "new" ? 
								<img id={`project-image-${props.project.project}`} className={styles.image} maxHeight={160} src={`/${props.project.image.url}`} onError={() => {imageError(props.project.project)}}></img> 
								:
								<img id={`project-image-${props.project.id}`} className={styles.image} maxHeight={160} src={`/${props.project.image.url}`} onError={() => {imageError(props.project.id)}}></img> 
							
							}
							
						</Box>
					}
				</Item>
				<BasicProfile profile={props.project.user ? props.project.user[0] : []} project={props.project} projectsQueryType={projectsQueryType}/>
			</Column>
		</Grid>
	);
});
export default ProjectCard;
