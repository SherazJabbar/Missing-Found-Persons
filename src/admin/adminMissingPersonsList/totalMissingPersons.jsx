import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../RegisterdUsers/title';
import { useSelector } from 'react-redux';
import {format} from 'date-fns';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function TotalMissingPersons() {
  const classes = useStyles();
  const {missingPersons}= useSelector((state)=> state.admin);
  

  return (
    <React.Fragment>
      <Title>Total Missing Persons</Title>
      <Typography component="p" variant="h4">
        {missingPersons.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        
      Uptill Now: {format(new Date(), "MMM d, yyyy h:mm a")}
      </Typography>
      
    </React.Fragment>
  );
}