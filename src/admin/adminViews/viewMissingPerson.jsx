import React from "react";
import "./viewMissingPerson.css";
import { format } from "date-fns";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";
import {deleteEventFromFireStore} from '../../app/firebase/firestoreService';

export default function ViewMissingPerson({ history, missing }) {


  function handleDelete(id) {
    deleteEventFromFireStore(id);
    history.push('/adminPanel')
  }

  return (
    <>
      <div className="wrapper">
        <div className="left">
          <img src={missing.mediaUrl} alt="user" width="100"></img>
          <h4>Name : {missing.name}</h4>
          <p>
            Missing Since: {format(missing.dateofMissing, "MMM d, yyyy h:mm a")}
          </p>
        </div>
        <div className="right">
          <h4>Post ID: {missing.id}</h4>
          <div className="info">
            <h3>Missing Person Details</h3>
            <div className="info_data">
              <div className="data">
                <h4>NickName : {missing.nickName}</h4>
              </div>
              <div className="data">
                <h4>Date of Birth: {format(missing.dob, "MMM d, yyyy")}</h4>
              </div>
            </div>
            <div className="info_data">
              <div className="data">
                <h4>Gender : {missing.gender}</h4>
              </div>
              <div className="data">
                <h4>PhysicalAppearence : {missing.physicalAppearence}</h4>
              </div>
            </div>
            <div className="info_data">
              <div className="data">
                <h4>Height : {missing.height} f/inch</h4>
              </div>
              <div className="data">
                <h4>Weight : {missing.weight} kgs</h4>
              </div>
            </div>
            <div className="info_data">
              <div className="data">
                <h4>Complexion : {missing.complexion}</h4>
              </div>
              <div className="data">
                <h4>HairStyle : {missing.hairStyle}</h4>
              </div>
            </div>
          </div>

          <div className="projects">
            <h3>Location and Contact details</h3>
            <div className="projects_data">
              <div className="data">
                <h4>City : {missing.city}</h4>
              </div>
              <div className="data">
                <h4>Address : {missing.address}</h4>
              </div>
            </div>
            <div className="projects_data">
              <div className="data">
                <h4>Contact : {missing.phoneNumber}</h4>
              </div>
              <div className="data">
                <h4>Description : {missing.description}</h4>
              </div>
            </div>
          </div>
          <div className="projects">
            <div className="projects_data">
              <div className="data">
                <h4>Posted By : {missing.postedBy || missing.username}</h4>
              </div>
              <div className="data">
                <h4>
                  Posted On : {format(missing.timeStamp, "MMM d, yyyy h:mm a")}
                </h4>
              </div>
            </div>
          </div>
          <div className="projects_data">
            <div className="data">
              <h4>
                Delete Post:{" "}
                <IconButton aria-label="delete" onClick={()=> handleDelete(missing.id)}>
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
