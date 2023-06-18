import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Title from "../RegisterdUsers/title";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import listenToMissingPersonsForAdmin from "../../app/firebase/firestoreService.js";
import { listenToMissingPersons } from "../adminActions";
import { format } from "date-fns";


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function MissingPersonList() {
  const dispatched = useDispatch();
  const { missingPersons } = useSelector((state) => state.admin);

  useFirestoreCollection({
    query: () => listenToMissingPersonsForAdmin(),
    data: (missingPersons) =>
      dispatched(listenToMissingPersons(missingPersons)),
    deps: [dispatched],
  });

  

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Missing Persons</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Missing Since</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missingPersons.map((missingPerson) => (
            <TableRow key={missingPerson.id}>
              <TableCell>
                <Link to={ `/viewMissingPerson/${missingPerson.id}`}>
                <Avatar
                  alt="Remy Sharp"
                  src={missingPerson.mediaUrl}
                  className={classes.large}
                />
                </Link>
              
                
              </TableCell>
              <TableCell>{missingPerson.name}</TableCell>
              <TableCell>{missingPerson.city}</TableCell>
              <TableCell>
              {format(missingPerson.dateofMissing, "MMM d, yyyy h:mm a")}
              </TableCell>
              <TableCell align="right">
                    <Link to={`/adminEditMissing/${missingPerson.id}`}>Edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more missing Persons
        </Link>
      </div>
    </React.Fragment>
  );
}
