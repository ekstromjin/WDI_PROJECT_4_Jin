
/* global google */
import mapStyles from './mapStyles';
import React from 'react';

class GoogleMap extends React.Component {
  state = {
    center: { lat: 0, lng: 0 }
  }

  constructor(props){
    super(props);

    this.state = { center: this.props };
  }

  render() {
    return (
      <main>
        <div className="google-map" ref={element => this.mapCanvas = element}>
        </div>
      </main>
    );
  }

  componentDidMount() {

    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.state.center,
      zoom: 14,
      styles: [
          {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#aee2e0"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#abce83"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#769E72"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#7B8758"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "color": "#EBF4A4"
                  }
              ]
          },
          {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                  {
                      "visibility": "simplified"
                  },
                  {
                      "color": "#8dab68"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#5B5B3F"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "color": "#ABCE83"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road.local",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#A4C67D"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#9BBF72"
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                  {
                      "color": "#EBF4A4"
                  }
              ]
          },
          {
              "featureType": "transit",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.stroke",
              "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#87ae79"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "geometry.fill",
              "stylers": [
                  {
                      "color": "#7f2200"
                  },
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "labels.text.stroke",
              "stylers": [
                  {
                      "color": "#ffffff"
                  },
                  {
                      "visibility": "on"
                  },
                  {
                      "weight": 4.1
                  }
              ]
          },
          {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#495421"
                  }
              ]
          },
          {
              "featureType": "administrative.neighborhood",
              "elementType": "labels",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          }
      ]
    });
    this.marker = new google.maps.Marker({
      map: this.map,
      position: this.state.center
    });
  }
  componentWillUnmount() {
    this.marker = null;
    this.map = null;
  }

}

export default GoogleMap;
