import React from "react";
import firebase from "../../app/config/firebase";
import { Container, Divider, Input, Item, Image } from "semantic-ui-react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { format } from "date-fns";

class SearchByLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null,
      matchingDocs: [],
      center: {
        lat: 31.4873951,
        lng: 74.3014118,
      },
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getReverseGeoCode = this.getReverseGeoCode.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("Geolocation is not supporte dby the browser");
    }
  }

  getReverseGeoCode() {
    console.log(this.state.latitude);
    console.log(this.state.longitude);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&key=AIzaSyDesp_pcvPyl4DLE8KZgV2Jve62E6CRiaE`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          userAddress: data.results[0].formatted_address,
        })
      )
      .catch((error) => alert(error));
  }

  getCoordinates(position) {
    console.log(position);
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    this.getReverseGeoCode();
    const db = firebase.firestore();
    const geofire = require("geofire-common");

    // const center = [31.482012099999995, 74.3031702];
    const center = [this.state.latitude, this.state.longitude];
    const radiusInM = 10 * 1000;

    // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
    // a separate query for each pair. There can be up to 9 pairs of bounds
    // depending on overlap, but in most cases there are 4.
    const bounds = geofire.geohashQueryBounds(center, radiusInM);
    const promises = [];
    for (const b of bounds) {
      const q = db
        .collection("timeline")
        .doc("type")
        .collection("missing")
        .orderBy("geohash")
        .startAt(b[0])
        .endAt(b[1]);

      promises.push(q.get());
    }

    // Collect all the query results together into a single list
    Promise.all(promises)
      .then((snapshots) => {
        const matchingDocs = [];

        for (const snap of snapshots) {
          // console.log(snap);
          for (const doc of snap.docs) {
            const lat = doc.data().venue.latLng.lat;
            const lng = doc.data().venue.latLng.lng;

            // We have to filter out a few false positives due to GeoHash
            // accuracy, but most will match
            const distanceInKm = geofire.distanceBetween([lat, lng], center);
            const distanceInM = distanceInKm * 1000;
            if (distanceInM <= radiusInM) {
              matchingDocs.push(doc.data());
            }
          }
        }

        return matchingDocs;
      })
      .then((matchingDocs) => {
        this.setState({ matchingDocs: matchingDocs });
        console.log(this.state.matchingDocs);
      });
  }

  nearby() {}

  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={this.state.center} defaultZoom={12}>
        {this.state.matchingDocs.map((doc) => (
          <Marker
            position={{ lat: doc.venue.latLng.lat, lng: doc.venue.latLng.lng }}
          ></Marker>
        ))}
      </GoogleMap>
    ));
    return (
      <>
        <Container>
          <div>
            {/* <h2>Advance GeoLocation Search </h2> */}
            {/* <button onClick={this.getLocation}>get coordinates</button>
        <h1>{this.state.latitude}</h1>
        <h1>{this.state.longitude}</h1> */}

            {/* <Form>
            <TextArea rows={1} placeholder="Tell us more" />
            <i class="location arrow icon" onClick={this.getLocation}></i>
          </Form> */}
            <Input
              fluid
              icon="location arrow"
              placeholder="Search..."
              onClick={this.getLocation}
              value={this.state.userAddress}
            />
            {/* <i class="location arrow icon" onClick={this.getLocation}></i> */}
            <Divider />
            <div style={{ height: 300, width: "100%" }}>
              <GoogleMapExample
                containerElement={
                  <div
                    style={{
                      height: `500px`,
                      width: "1122px",
                    }}
                  />
                }
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </div>
          <div style={{ marginTop: "300px" }}>
            {this.state.matchingDocs.map((doc) => (
              <Item.Group divided>
                <Item>
                  <Item.Image src={doc.mediaUrl} />
                  <Item.Content>
                    <Item.Header as="a">Name: {doc.name}</Item.Header>
                    <Item.Meta><i class="fas fa-file-signature"></i> NickName: {doc.nickName}</Item.Meta>
                    <Item.Meta>
                      {/* <span>Date of Missing: {format(doc.dateofMissing, 'MMM d, yyyy')}</span> */}
                      <span><i class="far fa-address-card"></i> Address: {doc.address}</span>

                      <span>Name:</span>
                    </Item.Meta>
                    <Item.Meta>
                      <span><i class="fas fa-city"></i> City: {doc.city}</span>
                    </Item.Meta>
                    
                    <Item.Description>
                    <i class="fas fa-audio-description"></i>  Description: {doc.description}
                    </Item.Description>

                    <Item.Extra>
                    <i class="far fa-user"></i> Posted By: {doc.postedBy || doc.username}
                    </Item.Extra>
                    <Item.Extra><i class="fas fa-phone"></i> PhoneNumber: {doc.phoneNumber}</Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            ))}
          </div>
        </Container>
        <Container></Container>
      </>
    );
  }
}

export default SearchByLocation;
