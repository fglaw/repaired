import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { pulsingMarker } from './pulsing';

// Zoom function on booking new page
const zoomMapToMaker = (map, marker) => {
  const bounds = new mapboxgl.LngLatBounds();
  bounds.extend([marker.lng, marker.lat])
  map.fitBounds(bounds, { padding: 0, maxZoom: 15, duration: 0 });
}

// Zoom function on booking show page
const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 100, maxZoom: 15, duration: 0 });
};

// Add Marker to the map: for booking_new page and show page
const addMarkerToMap = (map) => {
  const mapElement = document.getElementById('map');
  // if only one marker for customer is there
  if (mapElement.dataset.marker != null) {
    marker = JSON.parse(mapElement.dataset.marker);

    zoomMapToMaker(map, marker);
  }
  // else if take the markers from the view in `app/views/bookings/show.html.erb`
  else if (mapElement.dataset.markers != null) {
    const markers = JSON.parse(mapElement.dataset.markers);
    console.log('markers', markers);
    
    markers.forEach((marker) => {
      let object = {
        color: 'blue'
      }
      console.log('object_default:', object);

    // change icon marker for customer
    if (marker.who == 'customer') {
      console.log('who:', marker.who);
      // change color to red
      object.color = '#63488C'

      new mapboxgl.Marker(null, object)
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
    }

    // change icon marker for mechanic
    else if (marker.who == 'mechanic') {
      console.log('who:', marker.who);
      console.log('object_mechanic:', object);

      // change icon to bicycle
      var el = document.createElement('div');
      el.className = 'marker';
      console.log('element:', el);

      new mapboxgl.Marker(el)
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
    }
    
    });

    fitMapToMarkers(map, markers);
  }
}

// Add Map to pages
const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      attributionControl: false
    });

    addMarkerToMap(map);
    pulsingMarker(map, marker);
  }
};

// variables so that they can be used in another files
let map;
let marker;

export { initMapbox };