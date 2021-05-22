import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { pulsingMarker } from './pulsing';

// Zoom function
const zoomMapToMap = (map, marker) => {
  const bounds = new mapboxgl.LngLatBounds();
  bounds.extend([marker.lng, marker.lat])
  map.fitBounds(bounds, { padding: 0, maxZoom: 15, duration: 0 });
}

const fitMapToMarkers = (map, markers) => {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach(marker => bounds.extend([ marker.lng, marker.lat ]));
  map.fitBounds(bounds, { padding: 175, maxZoom: 15, duration: 0 });
};

// Add Marker to the map: for booking_new page and show page
const addMarkerToMap = (map) => {
  const mapElement = document.getElementById('map');
  // if only one marker for customer is there
  if (mapElement.dataset.marker != null) {
    const marker = JSON.parse(mapElement.dataset.marker);
    new mapboxgl.Marker()
    .setLngLat([ marker.lng, marker.lat ])
    .addTo(map);

    zoomMapToMap(map, marker);
    pulsingMarker(map);
  }
  // else if take the markers from the view in `app/views/bookings/show.html.erb`
  else if (mapElement.dataset.markers != null) {
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
    new mapboxgl.Marker()
    .setLngLat([ marker.lng, marker.lat ])
    .addTo(map);
    });

    fitMapToMarkers(map, markers);
  }
}

// Add Map to pages
const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    addMarkerToMap(map);
  }
};

export { initMapbox };
