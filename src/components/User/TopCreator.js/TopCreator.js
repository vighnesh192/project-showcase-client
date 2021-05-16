import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const TopCreator = (props) => {
  const classes = useStyles();

  const topCreators = useSelector(state => state.users);

  console.log('TOP CREATORS FROM TOPcREATOR:-', props);

  return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src={props.user[0].profilePic.url}>{props.user[0].user[0].first_name ? props.user[0].user[0].first_name[0].toUpperCase() : props.user[0].user[0].username[0].toUpperCase()}</Avatar>
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                className={classes.inline}
                color="textPrimary"
              >
                {props.user[0].user[0].first_name ? props.user[0].user[0].first_name + " " + props.user[0].user[0].last_name : props.user[0].user[0].username}
              </Typography>
              <Typography variant="body2">
                  {props.user[0].user[0].bio ? props.user[0].user[0].bio : ''}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
  );
}

export default TopCreator;