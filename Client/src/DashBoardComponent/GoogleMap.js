
/*global google*/
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import employeeList from './MockResponse';
import SideDrawer from './SideBar';
import '../cssComponents/Dashboard.css'
// const google = window.google;
// var map;
// var markersArray = [{ lat: 21.161639, lng: 79.659862 },
// { lat: 21.173117, lng: 79.658434 },
// { lat: 21.188337, lng: 79.661873 },
// { lat: 21.204019, lng: 79.670980 },
// { lat: 21.221012, lng: 79.657730 },
// { lat: 21.229919, lng: 79.648176 },
// ]
// // define global variable to store polyline
// var polyline = null;

export class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.handleMapReady = this.handleMapReady.bind(this);
  
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Live location  " + position.coords.latitude + " & " + position.coords.longitude)
    });
  }

  handleMapReady(mapProps, map) {
    this.calculateAndDisplayRoute(map);
  }

  calculateAndDisplayRoute(map) {
    // const google = window.google;
    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);


    const waypoints = this.props.data.map(item => {
      console.log("waypoints ", { lat: item.lat, lng: item.lng });
      return {
        location: { lat: item.lat, lng: item.lng },
        stopover: true
      }
    })
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    // console.log("origin = ", origin);
    directionsService.route({
      origin: origin,
      destination: destination,
      waypoints: waypoints,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {} ,         // Shows the InfoWindow to the selected place upon a marker
    isAdmin: true,
  };


  onMarkerClick = (props, marker, e) => {
    console.log("marker cliked here");
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {

    return (
      <>
        <div className='MapMainContaioner'>
          <div className={(this.state.isAdmin == true) ? 'UserListAdmin' : 'UserListNoramlUser'}>
            {this.state.isAdmin &&
              <SideDrawer />}

          </div>
          <div className={(this.state.isAdmin == true) ? 'MapContainerAdminUser' : 'MapContainerNormalUser'}>
            <button onClick={this.handleMapReady} id="routeButton">Route</button>
            <Map
              google={this.props.google}
              zoom={14}
              // style={{width: "50%", height: "90%"}}
              initialCenter={this.props.center}
            // onReady={this.handleMapReady}
            >

              {/* CREATE MULTIPLE MARKER ON THE MAP */}
              {employeeList.map(marker => {
                return (
                  //   <CurrentLocation
                  //   centerAroundCurrentLocation
                  //   google={this.props.google}

                  // >
                  <Marker
                    key={marker.employeeId}
                    onClick={this.onMarkerClick}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    name={marker.employeeName}
                    icon={marker.icon}
                  >

                  </Marker>
                  /* </CurrentLocation> */
                )
              })}

              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}
              >
                <div>
                  <h4>{this.state.selectedPlace.name}</h4>
                </div>
              </InfoWindow>

            </Map>
          </div>
        </div>
      </>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDTxTbcLTMhK1HYDzLsIm2HFUVAPRx7hfQ", // "AIzaSyDTxTbcLTMhK1HYDzLsIm2HFUVAPRx7hfQ",
  // libraries: ['direction']
})(GoogleMap);


/*

{props.markers.map(marker => {
          const onClick = props.onClick.bind(this, marker)
          return (
            <Marker
              key={marker.id}
              onClick={onClick}
              position={{ lat: marker.latitude, lng: marker.longitude }}
            >
              {props.selectedMarker === marker &&
                <InfoWindow>
                  <div>
                    {marker.shelter}
                  </div>
                </InfoWindow>}
              }
            </Marker>
          )
        }


*/



// import React from 'react';
// import GoogleMapReact from 'google-map-react';

// const GoogleMaps = ({ latitude, longitude }) => {
//  const renderMarkers = (map, maps) => {
//   let marker = new maps.Marker({
//   position: { lat: latitude, lng: longitude },
//   map,
//   title: 'Hello World!'
//   });
//   return marker;
//  };

//  return (
//    <div style={{ height: '50vh', width: '100%' }}>
//     <GoogleMapReact
//       bootstrapURLKeys={{ key: "AIzaSyD0icEwgz8zQzrvgOwYEHrM48k5L2Mu7vI" }}
//       defaultCenter={{ lat: latitude, lng: longitude }}
//       defaultZoom={16}
//       yesIWantToUseGoogleMapApiInternals
//       onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
//     >
//     </GoogleMapReact>
//    </div>
//  );
// };

// export default GoogleMaps;