import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';


import '../../../index.css'
import { getUserProfile } from '../../../services/userService';
import { setUserProfile } from '../../../actions/userActions';

const Profile = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('HERE')
        let mounted = true;
        if(mounted) {
            getUserProfile(props.match.params.userId)
                .then((data) => {
                        console.log('USEEFFECT', data)
                        dispatch(setUserProfile(data))
                    })
                .catch((err) => console.log('Error', err));
            }
            return () => {
              mounted = false;
            }
    }, []);

    const profile = useSelector((state) => state.users.profile);
    console.log('PROFILE STATE', profile);

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
        name: {
          fontSize: '28px'
        },
        bio: {
          fontSize: '1rem',
          marginTop: '6px',
          marginLeft: '1px'
        }
    }));

    const classes = useStyles();
    const theme = useTheme();

    return (
      <div id="all-components">
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar className={classes.img} src={profile ? profile.profilePic.url : ''}></Avatar>
          </ListItemAvatar>

          <ListItemText
            className={classes.listItemText}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  className={classes.inline, classes.name}
                  color="textPrimary"
                >
                  {profile ? profile.first_name + ' ' + profile.last_name : ''}
                </Typography>
                <Typography variant="body2" className={classes.bio}>
                  {profile ? profile.bio != null ? profile.bio : 'CREATOR' : 'CREATOR'}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      </div>
    )
}

export default withRouter(Profile);
