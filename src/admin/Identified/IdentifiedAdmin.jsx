import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Title from "../RegisterdUsers/title";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import { fetchIdentifiedFromFireStore } from "../../app/firebase/firestoreService.js";
import { listenToAdminIdentified } from "../adminActions";
import {format} from 'date-fns';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function IdentifiedAdmin() {
  const dispatched = useDispatch();
  const { adminIdentified } = useSelector((state) => state.admin);

  useFirestoreCollection({
    query: () => fetchIdentifiedFromFireStore(),
    data: (missingPersons) =>
      dispatched(listenToAdminIdentified(missingPersons)),
    deps: [dispatched],
  });

  const classes = useStyles();
  return (
    <Container maxWidth="lg" style={{ marginTop: "-290px", padding: "2rem" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper>
            <Title>Identified Persons</Title>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>PersonName</TableCell>

                  <TableCell align="right">Post ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {adminIdentified.map((identifiedPerson) => (
                  <TableRow key={identifiedPerson.missing_owner}>
                    <TableCell>
                      {/* <Link to={ `/viewMissingPerson/${missingPerson.id}`}> */}
                      <Avatar
                        alt="Remy Sharp"
                        src={identifiedPerson.missing_url}
                        className={classes.large}
                      />
                      {/* </Link> */}
                    </TableCell>
                    <TableCell>{identifiedPerson.missing_owner}</TableCell>
                    <TableCell>{identifiedPerson.missing_name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell align="right">
                      {identifiedPerson.missing_post}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
           
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
              <Paper style={{height:'200px'}}>
              <Title>Total Missing Persons</Title>
      <Typography component="p" variant="h4">
        
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        
      Uptill Now: {format(new Date(), "MMM d, yyyy h:mm a")}
      </Typography>
              </Paper>
            </Grid>
      </Grid>
    </Container>
  );
}
