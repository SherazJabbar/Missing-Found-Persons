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
import {listenToFoundPersonsForAdmin} from "../../app/firebase/firestoreService.js";
import { listenToFoundPersons } from "../adminActions";
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
  const { foundPersons } = useSelector((state) => state.admin);

  useFirestoreCollection({
    query: () => listenToFoundPersonsForAdmin(),
    data: (foundPersons) =>
      dispatched(listenToFoundPersons(foundPersons)),
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
            <TableCell>Found On</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foundPersons.map((foundPerson) => (
            <TableRow key={foundPerson.id}>
              <TableCell>
                <Link to={ `/viewFoundPerson/${foundPerson.id}`}>
                <Avatar
                  alt="Remy Sharp"
                  src={foundPerson.mediaUrl}
                  className={classes.large}
                />
                </Link>
              
                
              </TableCell>
              <TableCell>{foundPerson.name}</TableCell>
              <TableCell>{foundPerson.city}</TableCell>
              <TableCell>
              {format(foundPerson.dateFound, "MMM d, yyyy h:mm a")}
              </TableCell>
              <TableCell align="right">
                    <Link to={`/adminEditFound/${foundPerson.id}`}>Edit</Link>
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
