import React from 'react';
import {useHistory} from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import './Home.css'

function Home() {

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
    const classes = useStyles();

    const history = useHistory();

    const handleClick = () => {
        history.push("/popular");
    }

    return (
        // <div id="home">
        //     <div id="left">
        //         <div id="desc">
        //             <h1>Platform to showcase your projects</h1>
        //             <p>Signup, upload your project, and race to the top of the leaderboard.</p>
        //         </div>                
        //         <button id="explore" onClick={handleClick}>Explore</button>
        //     </div>

        //     <div id="right">
        //         <img src={require("../../assets/images/undraw_profile_details_f8b7.svg").default} alt="Illustration" />
        //     </div>
        // </div>
        <div className={classes.root} id="home-page">
			<Grid container spacing={2} id='home-page-grid'>
				<Grid style={{display: 'flex', flexDirection: 'column'}} item md={6} id="left">
                    <Typography id="home-title" variant="h3" gutterBottom>
                        Platform to showcase your projects
                    </Typography>
                    <Typography id="home-description" variant="body1" gutterBottom>
                        Signup, upload your project, and race to the top of the leaderboard.
                    </Typography>
                    <button id="explore" onClick={handleClick}>Explore</button>
				</Grid>
				<Grid item md={6} id="right">
                    <img id="main-ill" src={require("../../assets/images/undraw_profile_details_f8b7.svg").default} alt="Illustration" />
				</Grid>
			</Grid>
		</div>
    )
}

export default Home;