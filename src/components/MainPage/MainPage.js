import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DisplayProjects from "../DisplayProjects/DisplayProjects";
import "./MainPage.css";
import { getProjects } from "../../services/projectService";
import { setProjects } from "../../actions/projectActions";

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
          console.log(data);
          dispatch(setProjects(data))
        });
		}
		return () => {
		  mounted = false;
		}
  });

	const classes = useStyles();

	return (
		<div className={classes.root} id="main-page">
			<Grid spacing={3}>
				<Grid item s={12} md={8}>
					<DisplayProjects />
				</Grid>
			</Grid>
		</div>
	);
};

export default MainPage;
