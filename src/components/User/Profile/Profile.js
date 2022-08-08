import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';

import '../../../index.css';
import './Profile.css'
import { followUnfollow, getFollowedData, getUserProfile } from '../../../services/userService';
import { setUserProfile } from '../../../actions/userActions';
import DisplayProjects from '../../Project/DisplayProjects/DisplayProjects';
import { getProjectsByUser, getUpvotedProjectsByUser } from '../../../services/projectService';  
import { setProjects } from '../../../actions/projectActions';

const Profile = (props) => {
    const [tabState, setTabState] = useState('projects-tab');
    const [showFollow, setShowFollow] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
      let mounted = true;
      if(mounted) {
        getUserProfile(props.match.params.userId)
            .then((data) => {
              dispatch(setUserProfile(data));
              if(tabState === 'projects-tab') {
                getProjectsByUser(data.id)
                  .then(data => {
                    dispatch(setProjects(data, 'popular'))
                  });
              }
              else {
                getUpvotedProjectsByUser(profile.id)
                  .then(data => {
                    dispatch(setProjects(data, 'popular'))
                  });
              }
              getFollowedData(props.match.params.userId)
                .then(data => {
                  console.log("GET FOLLOWED DATA:-", data);
                  setShowFollow(!data.success);
                })
                .catch(err => console.error("GET FOLLOWED DATA ERROR", err));
            })
            .catch((err) => console.log('Error', err));
      }
      return () => {
        mounted = false;
      }
    }, [props.match.params.userId]);

    const profile = useSelector((state) => state.users.profile);

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          backgroundColor: "#F4F7FA",
          minHeight: '45vh',
          boxShadow: 'none'
        },
        details: {
          display: 'flex',
          flexDirection: 'column',
        },
        content: {
          flex: '1 0 auto',
        },
        cover: {
          width: 151,
        },
        controls: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        playIcon: {
          height: 38,
          width: 38,
        },
        img: {
          width: '13.5vw',
          height: '13.5vw',
          borderRadius: 200
        },
        inline: {
          display: 'inline',
        },
        listItemText: {
          marginLeft: '5%',
          marginTop: '2%',
        },
        bio: {
          // fontSize: '1rem',
          marginTop: '6px',
          marginLeft: '1px'
        }
    }));

    const classes = useStyles();
    const theme = useTheme();

    theme.typography.h4 = {
      fontSize: '28px',
      '@media (max-width:976px)': {
        fontSize: '25px',
      },
      '@media (max-width:425px)': {
        fontSize: '20px',
      }
    };
    
    theme.typography.body2 = {
      fontSize: '22px',
      '@media (max-width:976px)': {
        fontSize: '18px',
      },
      '@media (max-width:425px)': {
        fontSize: '15px',
      }
    };

    theme.palette.primary.main = '#3F3D56';
    theme.palette.primary.contrastText = '#fff';

    const handleTabClick = (id) => {
      setTabState(id);
      if(id === 'projects-tab') {
        getProjectsByUser(profile.id)
          .then(data => {
            dispatch(setProjects(data, 'popular'))
          });
        document.getElementById('projects-tab').style.borderBottom = '1px solid #262626';
        document.getElementById('upvoted-tab').style.borderBottom = 'none';
      }
      else {
        getUpvotedProjectsByUser(profile.id)
          .then(data => {
            dispatch(setProjects(data, 'popular'))
          });
        document.getElementById('upvoted-tab').style.borderBottom = '1px solid #262626';
        document.getElementById('projects-tab').style.borderBottom = 'none';
      }
    }

    const handleFollowClick = () => {
      // props.match.params.userId
      console.log("FOLLOWED", showFollow);
      followUnfollow(props.match.params.userId).then((data) => {
        data.success ? setShowFollow(!showFollow) : console.error("FOLLOW ERROR");
      })
      .catch(error => console.error("FOLLOW ERROR:-", error));
    }

    return (
      <div id="all-components">
        <div>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar className={classes.img} src={profile ? profile.profilePic.url : ''}></Avatar>
            </ListItemAvatar>

            <ListItemText
              className={classes.listItemText}
              secondary={
                <React.Fragment>
                  <ThemeProvider theme={theme}>
                    <Typography
                      component="span"
                      className={classes.inline}
                      color="textPrimary"
                      variant="h4"
                    >
                      {profile ? profile.first_name + ' ' + profile.last_name : ''}
                    </Typography>
                    <Typography variant="body2" className={classes.bio}>
                      {profile ? profile.bio != null ? profile.bio : 'CREATOR' : 'CREATOR'}
                    </Typography>
                    {showFollow ? <button id="follow" onClick={handleFollowClick}>Follow</button> : <button id="follow" onClick={handleFollowClick}>Unfollow</button>} 
                  </ThemeProvider>
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
        <div id="profile-nav">
          <ul>
            <li style={{marginLeft: "0.75rem", borderBottom: '1px solid #262626'}} id="projects-tab" onClick={() => handleTabClick('projects-tab')}>
              Projects
            </li>
            <li style={{marginLeft: "2rem"}} id="upvoted-tab" onClick={() => handleTabClick('upvoted-tab')}>
              Upvoted
            </li>
          </ul>
        </div>
        <br />
        <br />
        <div id="profile-nav-content">
          {
            tabState === 'projects-tab' 
              ?
            <DisplayProjects from={'Profile'}/>
              :
            <DisplayProjects from={'Profile'}/>
          }
        </div>
      </div>
    )
}

export default withRouter(Profile);
