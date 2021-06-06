import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getDirection } from './direction';
import { pulsingMarker } from './pulsing';

// Zoom function on booking show page
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lat, marker.lon ]));
  map.fitBounds(bounds, { padding: 100, maxZoom: 15, duration: 0 });
};

// Add Marker to the map: for booking_new page and show page
const addMarkerToMap = (map) => {
  const mapElement = document.getElementById('map');
  const markers = JSON.parse(mapElement.dataset.markers);
  
  markers.forEach((marker) => {
    
    // Create a HTML element for your custom marker
    const element = document.createElement('div');
    element.className = 'marker';
    element.style.backgroundImage = 'url(https://res.cloudinary.com/ddk6eqs6l/image/upload/v1622891551/i4ltbqhwlljnfxiqzvp1.png)';

      new mapboxgl.Marker(element)
      .setLngLat([ marker.lon, marker.lat ])
      .addTo(map);
    });
    // fitMapToMarkers(map, markers);
}



// Add Map to pages
const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
      map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      attributionControl: false,
      center: [13.401874, 52.529614],
      zoom: 6
    });

    // get customer's current location
    var geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
    });
      // Add the control to the map.
      // map.addControl(geolocate);

      console.log("mapElement.dataset:", mapElement.dataset);
      if (mapElement.dataset.myid != null) {
        map.addControl(geolocate);
      }
      // here is for one customer marker and several mechanic markers for show page for customer
      else if (mapElement.dataset.customer != null) {
        // add customer_marker 
        customerMarker = JSON.parse(mapElement.dataset.customer_marker)
        console.log('customerMarker', typeof customerMarker, customerMarker)

        // add mechanics markers
          map.flyTo({
            center: [
              customerMarker[0].lon,
              customerMarker[0].lat
            ],
            zoom: 10,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
          });
          // make the customer marker animated
          pulsingMarker(map, customerMarker)
          // add several mechanic markers
          addMarkerToMap(map);
      };
        // add one mechanic marker and one customer marker in show page for mechanic
      if (mapElement.dataset.mechanic != null) {
          mechanic_marker = JSON.parse(mapElement.dataset.marker)
          console.log('mechanic_marker', typeof mechanic_marker, mechanic_marker);
          mechanicMarkerPuls = [ mechanic_marker[0].lon, mechanic_marker[0].lat ]
          customerMarker = JSON.parse(mapElement.dataset.customer_marker)
          console.log('customerMarker', typeof customerMarker, customerMarker);

          map.flyTo({
            center: [
              ( parseFloat(customerMarker[0].lon) + mechanic_marker[0].lon) / 2, 
              ( parseFloat(customerMarker[0].lat) + mechanic_marker[0].lat) / 2
            ],
            zoom: 12,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
          });

          // add customer marker and color it purple
          new mapboxgl.Marker({
            color: '#A3A6D8'
          })
          .setLngLat([ parseFloat(customerMarker[0].lon), parseFloat(customerMarker[0].lat) ])
          .addTo(map);

          // add mechanic marker and color it purple
          new mapboxgl.Marker()
          .setLngLat([ mechanic_marker[0].lon, mechanic_marker[0].lat ])
          // .addTo(map);

          // get direction when click on map anywhere
          pulsingMarker(map, mechanicMarkerPuls);
          getDirection(map, mechanic_marker, customerMarker);
        }

        // Set an event listener that fires
        // when a geolocate event occurs.
        geolocate.on('geolocate', function(e) {
          let customerLon = e.coords.longitude;
          let customerLat = e.coords.latitude
          let position = [customerLon, customerLat];
          console.log('customer location:',position);
          // save current_location in localstrorage to be able to use in show.html.erb page
          localStorage.setItem("current_location",position);
          console.log("I saved it")
        });
  }
};

// these three variables are for direction.js
let map;
let mechanic_marker;
let customerMarker;
let customer_marker;
let mechanicMarkerPuls;

export { initMapbox };