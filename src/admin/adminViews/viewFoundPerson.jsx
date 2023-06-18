import React from "react";
import "./viewMissingPerson.css";
import { format } from "date-fns";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {deleteFoundPersonFromFireStore} from '../../app/firebase/firestoreService';

export default function ViewFoundPerson({ history, found }) {


  function handleDelete(id) {
    deleteFoundPersonFromFireStore(id);
    history.push('/adminPanel')
  }

  return (
    <>
      <div className="wrapper">
        <div className="left">
          <img src={found.mediaUrl} alt="user" width="100"></img>
          <h4>Name : {found.name}</h4>
          <p>
            Found On: {format(found.dateFound, "MMM d, yyyy h:mm a")}
          </p>
        </div>
        <div className="right">
          <h4>Post ID: {found.id}</h4>
          <div className="info">
            <h3>Found Person Details</h3>
            <div className="info_data">
              <div className="data">
                <h4>NickName : {found.nickName}</h4>
              </div>
              <div className="data">
                <h4>Age : {found.age}</h4>
              </div>
            </div>
            <div className="info_data">
              <div className="data">
                <h4>Gender : {found.gender}</h4>
              </div>
              <div className="data">
                <h4>PhysicalAppearence : {found.physicalAppearence}</h4>
              </div>
            </div>
            <div className="info_data">
              <div className="data">
                <h4>Height : {found.height} f/inch</h4>
              </div>
              <div className="data">
                <h4>Weight : {found.weight} kgs</h4>
              </div>
            </div>
            <div className="info_data">
              <div className="data">
                <h4>Complexion : {found.complexion}</h4>
              </div>
              <div className="data">
                <h4>HairStyle : {found.hairStyle}</h4>
              </div>
            </div>
          </div>

          <div className="projects">
            <h3>Location and Contact details</h3>
            <div className="projects_data">
              <div className="data">
                <h4>City : {found.city}</h4>
              </div>
              <div className="data">
                <h4>Address : {found.address}</h4>
              </div>
            </div>
            <div className="projects_data">
              <div className="data">
                <h4>Contact : {found.phoneNumber}</h4>
              </div>
              <div className="data">
                <h4>Description : {found.description}</h4>
              </div>
            </div>
          </div>
          <div className="projects">
            <div className="projects_data">
              <div className="data">
                <h4>Posted By : {found.postedBy || found.username}</h4>
              </div>
              <div className="data">
                <h4>
                  Posted On : {format(found.timeStamp, "MMM d, yyyy h:mm a")}
                </h4>
              </div>
            </div>
          </div>
          <div className="projects_data">
            <div className="data">
              <h4>
                Delete Post:{" "}
                <IconButton aria-label="delete" onClick={()=> handleDelete(found.id)}>
                  <DeleteIcon />
                </IconButton>
              </h4>
            </div>
          </div>

          <div className="social_media">
            <ul>
              <li>
                <FacebookIcon />
              </li>
              <li>
                <InstagramIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
