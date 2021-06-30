import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DisplayProjects from "../Project/DisplayProjects/DisplayProjects";
import "./MainPage.css";
import { getProjects } from "../../services/projectService";
import { getTopCreators } from "../../services/userService";
import { setProjects } from "../../actions/projectActions";
import { setTopCreators } from "../../actions/userActions";
import TopCreatorsList from "../User/TopCreators/TopCreatorsList";

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

const MainPage = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
		if(mounted) {
			if(props.match.params.sortBy) {
				getProjects(props.match.params.sortBy)
					.then(data => {
						dispatch(setProjects(data, props.match.params.sortBy))
					});
					
				getTopCreators()
					.then(data => {
						dispatch(setTopCreators(data));
					})
			}
			else {
				getProjects('popular')
					.then(data => {
						dispatch(setProjects(data, 'popular'))
					});
					
				getTopCreators()
					.then(data => {
						dispatch(setTopCreators(data));
					})
			}
		}
		return () => {
		  mounted = false;
		}
  }, []);

	const classes = useStyles();

	return (
		<div className={classes.root} id="main-page">
			<Grid container spacing={3} id='main-page-grid'>
				<Grid item sm={7} md={8} id="display-projects">
					<DisplayProjects from={'MainPage'}/>
				</Grid>
				<Grid item sm={5} md={4} id="top-creators-list">
					<TopCreatorsList />
				</Grid>
			</Grid>
		</div>
	);
};

export default withRouter(MainPage);
