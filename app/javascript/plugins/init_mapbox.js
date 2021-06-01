import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Zoom function on booking new page
const zoomMapToMaker = (map, marker) => {
  const bounds = new mapboxgl.LngLatBounds();
  bounds.extend([marker.lng, marker.lat])
  map.fitBounds(bounds, { padding: 0, maxZoom: 10, duration: 0 });
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
  else if (mapElement.dataset.markers) {
    const markers = JSON.parse(mapElement.dataset.markers);
    console.log('markers', markers);
    
    markers.forEach((marker) => {
      let object = {
        // color to purple
        color: '#63488C'
    }
      console.log('object_default:', object);

      // set marker for customer
      if (marker.who == 'customer') {
        console.log('who:', marker.who);
        console.log('object_default:', object);
        new mapboxgl.Marker()
        .setLngLat([ marker.lng, marker.lat ])
        .addTo(map);
      }

      // set marker for mechanic
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
      fitMapToMarkers(map, markers);
      console.log('help', fitMapToMarkers(map, markers));
    });
    console.log('map!', map);
    console.log('help');
   
  }
}

// Add Map to pages
const initMapbox = () => {
  const mapElement = document.getElementById('map');

  if (mapElement) { // only build a map if there's a div#map to inject into
    mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      attributionControl: false
    });

    // get customer's current location
    var geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
    });
      // Add the control to the map.
      map.addControl(geolocate);
      // Set an event listener that fires
      // when a trackuserlocationend event occurs.
      geolocate.on('trackuserlocationend', function() {
      console.log('A trackuserlocationend event has occurred.', geolocate)
      });
    
    addMarkerToMap(map);
  
  }
};

export { initMapbox };