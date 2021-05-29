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
  console.log('mapElement', mapElement);
  // if only one marker for customer is there
  if (mapElement.dataset.marker != null) {
    let marker = JSON.parse(mapElement.dataset.marker);
    console.log('marker', marker);
    console.log('map', map);
  
    new mapboxgl.Marker()
    .setLngLat([ marker.lng, marker.lat ])

    zoomMapToMaker(map, marker);
  }
  // else if take the markers from the view in `app/views/bookings/show.html.erb`
  else if (mapElement.dataset.markers != null) {
    const markers = JSON.parse(mapElement.dataset.markers);
    console.log('markers', markers);
    
    markers.forEach((marker) => {
      let object = {
        color: '#63488C'
    }
      console.log('object_default:', object);

      // change icon marker for customer
      if (marker.who == 'customer') {
        console.log('who:', marker.who);
        // change color to red
        console.log('object_default:', object);
        new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
      }

      // change icon marker for mechanic
      else if (marker.who == 'mechanic') {
        console.log('who:', marker.who);
    
        // change icon to bicycle
        var el = document.createElement('div');
        el.className = 'marker';
        console.log('element:', el);
        console.log('marker:', marker);
        
        new mapboxgl.Marker(null, object)
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

  var bike = document.createElement('div');
      bike.className = 'marker';
        console.log('bike:', bike);
        // console.log('marker:', marker);

  const marker = new mapboxgl.Marker(bike)
    .setLngLat([ 13.4050, 52.5200 ])

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      attributionControl: false
    });

    // to draw a pulsing dot icon on the map.
var pulsingDot = {
  width: 200,
  height: 200,
  data: new Uint8Array(200 * 200 * 4),
   
  // When the layer is added to the map,
  // get the rendering context for the map canvas.
  onAdd: function () {
  var canvas = document.createElement('canvas');
  canvas.width = this.width;
  canvas.height = this.height;
  this.context = canvas.getContext('2d');
  },
   
  // Call once before every frame where the icon will be used.
  render: function () {
  var duration = 1000;
  var t = (performance.now() % duration) / duration;
   
  var radius = (200 / 2) * 0.3;
  var outerRadius = (200 / 2) * 0.7 * t + radius;
  var context = this.context;
   
  // Draw the outer circle.
  context.clearRect(0, 0, this.width, this.height);
  context.beginPath();
  context.arc(
  this.width / 2,
  this.height / 2,
  outerRadius,
  0,
  Math.PI * 2
  );
  context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
  context.fill();
   
  // Draw the inner circle.
  context.beginPath();
  context.arc(
  this.width / 2,
  this.height / 2,
  radius,
  0,
  Math.PI * 2
  );
  context.fillStyle = 'rgba(255, 100, 100, 1)';
  context.strokeStyle = 'white';
  context.lineWidth = 2 + 4 * (1 - t);
  context.fill();
  context.stroke();
   
  // Update this image's data with data from the canvas.
  this.data = context.getImageData(
  0,
  0,
  this.width,
  this.height
  ).data;
   
  // Continuously repaint the map, resulting
  // in the smooth animation of the dot.
  map.triggerRepaint();
   
  // Return `true` to let the map know that the image was updated.
  return true;
  }
  };

    map.on('load', function () {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      map.addSource('dot-point', {
      'type': 'geojson',
      'data': {
      'type': 'FeatureCollection',
      'features': [
      {
      'type': 'Feature',
      'geometry': {
      'type': 'Point',
      'coordinates': [13.4050, 52.5200] // icon position [lng, lat]
      // 'maxzoom': 10
      }
      }
      ]
      }
      });
      map.addLayer({
      'id': 'layer-with-pulsing-dot',
      'type': 'symbol',
      'source': 'dot-point',
      'layout': {
      'icon-image': 'pulsing-dot'
      }
      });
      });
      // const bounds = new mapboxgl.LngLatBounds();
      // bounds.extend([13.4050, 52.5200])
      // map.fitBounds(bounds, { padding: 0, maxZoom: 15, duration: 0 });
    // pulsingMarker(map, marker);
    addMarkerToMap(map);
  }
};

// variables so that they can be used in another files
// let map;
// let marker;

export { initMapbox };