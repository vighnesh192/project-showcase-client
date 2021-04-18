import React from "react";
import { useSelector } from 'react-redux';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { Row, Column, Item } from "@mui-treasury/components/flex";
import { useSizedIconButtonStyles } from "@mui-treasury/styles/iconButton/sized";

const StyledTooltip = withStyles({
	tooltip: {
		marginTop: "0.2rem",
		backgroundColor: "rgba(0,0,0,0.72)",
		color: "#fff",
	},
})(Tooltip);

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
}));

const BasicProfile = (props) => {
	const styles = useBasicProfileStyles();
	console.log('PROFILE:-', props);
	return (
		<Row {...props}>
			<Item>
				<Avatar src={"https://lh3.googleusercontent.com/a-/AOh14GiBg4QH2jL9-L6mpNCyHNQ3ao0sq7R6QzAKhPpGqg=s96-c"} className={styles.avatar}>{props.profile ? props.profile.username[0].toUpperCase() : ""}</Avatar>
			</Item>
			<Item position={"middle"} pl={{ sm: 0.5, lg: 0.5 }}>
				<Typography className={styles.overline}>CREATOR</Typography>
				<Typography className={styles.name}>{props.profile ? props.profile.username : ""}</Typography>
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
	const iconBtnStyles = useSizedIconButtonStyles({ padding: 8, childSize: 20, position: "static" });
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
}));

export const ProjectCard = React.memo(function ShowcaseCard(props) {
	const styles = useStyles();
	const gap = { xs: 1, sm: 1.5, lg: 2 };
	const projectsQueryType = useSelector((state) => state.projects.queryType);
	console.log('QUERY STATE:-', projectsQueryType);
	console.log('PROJECT CARD:-', props.project);
	return (
		<Grid item xs={12} sm={6}>
			<Column
				className={styles.card}
				p={{ xs: 0.5, sm: 0.75, lg: 1 }}
				gap={gap}
			>
				<CardHeader project={projectsQueryType !== "new" ? props.project.proj : props.project}/>
				<Item>
					<Box minHeight={160} bgcolor={"#F4F7FA"} borderRadius={8} />
				</Item>
				<BasicProfile profile={props.project.user ? props.project.user[0] : []}/>
			</Column>
		</Grid>
	);
});
export default ProjectCard;
