import React from 'react';
import {useHistory} from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import './Home.css';
import MusicCardDemo from '../Layouts/Card';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Link from '@material-ui/core/Link';

import showcase from '../../assets/images/undraw_features_overview_jg7a.svg';
import upvote from '../../assets/images/undraw_Upvote_re_qn2k.svg';
import profile from '../../assets/images/undraw_online_cv_qy9w (1).svg';

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
        footerIcons: {
            color: "#000"
        }
    }));
    const classes = useStyles();

    const history = useHistory();

    const handleClick = () => {
        history.push("/popular");
    }

    return (
        <React.Fragment>
        <div className={classes.root} id="home-page">
			<Grid container spacing={2} id='home-page-grid'>
				<Grid style={{display: 'flex', flexDirection: 'column'}} item md={6} id="left">
                    <Typography id="home-title" variant="h3" gutterBottom>
                        Showcase and Discover Projects
                    </Typography>
                    <Typography id="home-description" variant="body1" gutterBottom>
                        A website for people to showcase their projects, discover projects by peers, get upvoted and build a project-centric profile.
                    </Typography>
                    <button id="explore" onClick={handleClick}>Explore</button>
				</Grid>
				<Grid item md={6} id="right">
                    <img id="main-ill" src={require("../../assets/images/undraw_profile_details_f8b7.svg").default} alt="Illustration" />
				</Grid>
			</Grid>

            <Typography id="hiw" variant="h4">How It Works?</Typography>
            <Grid container spacing={2} id="hiw-cards">
                <Grid item md={4}>
                    <MusicCardDemo heading="Showcase" body="Let the community know about your projects and progress!" image={showcase}/>
                </Grid>
                <Grid item md={4}>
                    <MusicCardDemo heading="Grow" body="Get upvotes and feedback for your project" image={upvote}/>
                </Grid>
                <Grid item md={4}>
                    <MusicCardDemo heading="Profile" body="Have all your projects at one place and race to become a top creator" image={profile}/>
                </Grid>
            </Grid>

            
		</div>
        <div id="footer">
            <Typography id="footer-text" variant="caption">
                For the community, by Vighnesh Kulkarni  
            </Typography>
            <div id="footer-icons">
                <Link href="https://github.com/vighnesh192" target="_blank" >
                    <GitHubIcon id="github"/> 
                </Link>
                <Link href="https://www.linkedin.com/in/vighnesh-kulkarni-vk192/" target="_blank" >
                    <LinkedInIcon id="linkedin"/>
                </Link>
                <Link href="https://twitter.com/vighnesh192" target="_blank" >
                    <TwitterIcon id="twitter"/> 
                </Link>
            </div>
        </div>
        </React.Fragment>
    )
}

export default Home;