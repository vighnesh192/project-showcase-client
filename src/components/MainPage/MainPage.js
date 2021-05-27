import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
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

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
		if(mounted) {
			getProjects('popular')
				.then(data => {
					dispatch(setProjects(data))
				}
		);
			getTopCreators()
				.then(data => {
					dispatch(setTopCreators(data));
				})
		}
		return () => {
		  mounted = false;
		}
  }, []);

	const classes = useStyles();

	return (
		<div className={classes.root} id="main-page">
			<Grid container spacing={3}>
				<Grid item  md={8}>
					<DisplayProjects />
				</Grid>
				<Grid item  md={4}>
					<TopCreatorsList />
				</Grid>
			</Grid>
		</div>
	);
};

export default MainPage;
