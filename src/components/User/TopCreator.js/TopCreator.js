import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
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
  const users = useSelector((state) => state.users);

  const classes = useStyles();

  const onCreatorClick = (id) => {
    props.history.push(`/user/${id}`);
  }

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
                className={classes.inline, "creator-name"}
                color="textPrimary"
                style={{ cursor: "pointer" }}
                onClick={() => onCreatorClick(props.user[0].userId)}
              >
                {props.user[0].user[0].first_name ? props.user[0].user[0].first_name + " " + props.user[0].user[0].last_name : props.user[0].user[0].username}
              </Typography>
              <Typography variant="body2" style={{ fontSize: "14px" }}>
                  {props.user[0].user[0].bio ? props.user[0].user[0].bio : ''}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
  );
}

export default withRouter(TopCreator);