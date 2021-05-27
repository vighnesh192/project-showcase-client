import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import TopCreator from '../TopCreator.js/TopCreator';
import { ListSubheader } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10
  },
  inline: {
    display: 'inline',
  },
  header: {
    fontWeight: 'bold',
    borderRadius: 10
  },
  divider: {
    marginBottom: '0.5rem'
  }
}));

const TopCreatorsList = () => {
  const classes = useStyles();

  const topCreators = useSelector(state => state.users);

  console.log('TOP CREATORS:-', topCreators);

  // @Doubt   Why does this not work if written directly in return()
  const renderUsers = topCreators.users ? topCreators.users.map((user, index) => {
    return <TopCreator key={index} user={user}/>
  }) : ""

  return (
    <List className={classes.root} subheader={<li />}>
      <ListSubheader className={classes.header}>Top Creators of the week</ListSubheader>
      <Divider component="li" className={classes.divider}/>
      {renderUsers}
    </List>
  );
}

export default TopCreatorsList;