import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Title from "./title";
import useFirestoreCollection from "../../app/hooks/useFirestoreCollection";
import { useDispatch, useSelector } from "react-redux";
import {listentoRegisterUsers} from "../../app/firebase/firestoreService";
import { listenToRegisteredUsers } from "../adminActions";
import { format } from "date-fns";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {deleteUserFromFireStore} from '../../app/firebase/firestoreService';


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function RegisteredUsers() {
  const dispatched = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useFirestoreCollection({
    query: () => listentoRegisterUsers(),
    data: (users) =>
      dispatched(listenToRegisteredUsers(users)),
    deps: [],
  });


  function handleDelete(id) {
    deleteUserFromFireStore(id);
    
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Missing Persons</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Profile Picture</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Member Since</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
              <Avatar
                  alt="Remy Sharp"
                  src={user.photoURL}
                  className={classes.large}
                />
                
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.phn}</TableCell>
              <TableCell>
              {format(user.timeStamp || user.timestamp, "MMM d, yyyy h:mm a")}
              </TableCell>
              <TableCell align="right">
              <IconButton aria-label="delete" onClick={()=> handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
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
