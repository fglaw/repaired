import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { getDirection } from './direction';
import { moveMarker } from './moveMarker';


// Zoom function on booking show page
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lat, marker.lon ]));
  map.fitBounds(bounds, { padding: 100, maxZoom: 15, duration: 0 });
};

// Add Marker to the map: for booking_new page and show page
const addMarkerToMap = (map) => {
  const mapElement = document.getElementById('map');
  console.log('mapElement', mapElement);
  
    const markers = JSON.parse(mapElement.dataset.markers);
    console.log('markers', markers);
    
    markers.forEach((marker) => {

      new mapboxgl.Marker()
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
        console.log('location map')
      }
      // here is for one customer marker and several mechanic markers for show page for customer
      else if (mapElement.dataset.customer != null) {
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

        // add customer_marker 
        console.log('customer_marker', localStorage.getItem("current_location"))
        console.log('customer_marker', typeof localStorage.getItem("current_location").split(",").map(Number))
        const customer_marker = localStorage.getItem("current_location").split(",").map(Number)
        new mapboxgl.Marker({
          color: '#63488C'
        })
        .setLngLat([ customer_marker[0], customer_marker[1] ])
        .addTo(map);
        // add mechanics markers
          map.flyTo({
            center: [
              customer_marker[0], 
              customer_marker[1] 
            ],
            zoom: 10,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
          });
          addMarkerToMap(map);
      };
        // add one mechanic marker and one customer marker in show page for mechanic
      if (mapElement.dataset.mechanic != null) {
          mechanic_marker = JSON.parse(mapElement.dataset.marker)
          console.log('mechanic_marker', typeof mechanic_marker, mechanic_marker);

          const customerMarker = JSON.parse(mapElement.dataset.customer_marker)
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
            color: '#63488C'
          })
          .setLngLat([parseFloat(customerMarker[0].lon), parseFloat(customerMarker[0].lat) ])
          .addTo(map);

          // get direction when click on map anywhere
          getDirection(map, mechanic_marker);
        }
  }
};

// these three variables are for direction.js
let map;
let mechanic_marker;

export { initMapbox };