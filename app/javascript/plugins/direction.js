import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { moveMarker } from './moveMarker';

const getDirection = (map, mechanic_marker) => {
    console.log('getDirection is working in init_mapbox file?')
    // initialize the map canvas to interact with later
    var canvas = map.getCanvasContainer();
    var start = [ mechanic_marker[0].lon, mechanic_marker[0].lat ];
    // var start = [-122.662323, 45.523751];
    // create a function to make a directions request
    const getRoute = (end) => {
        // make a directions request using cycling profile
        // an arbitrary start will always be the same
        // only the end or destination will change
        var start = [ mechanic_marker[0].lon, mechanic_marker[0].lat ];
        // var start = [-122.662323, 45.523751];
        var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
    
        // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function() {
            var json = JSON.parse(req.response);
            var data = json.routes[0];
            route = data.geometry.coordinates;
            console.log('route', route);
            // when click time button, start to move mechanic marker to customer
            if (route != null) {
                const timeButton = document.getElementById("time")
                timeButton.addEventListener('click', () => {
                    moveMarker(map, route);
                });
            };
            var geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            };
            // if the route already exists on the map, reset it using setData
            if (map.getSource('route')) {
                map.getSource('route').setData(geojson);
            } else { // otherwise, make a new request
                map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: geojson
                    }
                    }
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                }
                });
            }
            // add turn instructions here at the end
            // get the sidebar and add the instructions
            let duration = document.getElementById('time');
            var steps = data.legs[0].steps;
            
            var tripInstructions = [];
            for (var i = 0; i < steps.length; i++) {
                tripInstructions.push('<br><li>' + steps[i].maneuver.instruction) + '</li>';
                duration.innerHTML = '<h5>' + Math.floor(data.duration / 60) + '</h5> ' + ' min';
            }
        };
            req.send();
    }
    
    map.on('load', function() {
        // make an initial directions request that
        // starts and ends at the same location
  
        // Add starting point to the map
        map.addLayer({
            id: 'point',
            type: 'circle',
            source: {
                type: 'geojson',
                data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                    type: 'Point',
                    coordinates: start
                    }
                }
                ]
                }
            },
            paint: {
                'circle-radius': 10,
                'circle-color': '#3887be'
            }
        });
        // this is where the code from the next step will go
        // get end location from user by clicking anywhere on map
        map.on('click', function(e) {
            var coordsObj = e.lngLat;
            canvas.style.cursor = '';
            var coords = Object.keys(coordsObj).map(function(key) {
              return coordsObj[key];
            });
            var end = {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: coords
                }
              }
              ]
            };
            if (map.getLayer('end')) {
              map.getSource('end').setData(end);
            } else {
              map.addLayer({
                id: 'end',
                type: 'circle',
                source: {
                  type: 'geojson',
                  data: {
                    type: 'FeatureCollection',
                    features: [{
                      type: 'Feature',
                      properties: {},
                      geometry: {
                        type: 'Point',
                        coordinates: coords
                      }
                    }]
                  }
                },
                paint: {
                  'circle-radius': 10,
                  'circle-color': '#63488C'
                }
              });
            }
            getRoute(coords);
            console.log('getRoute(coords)', getRoute(coords));
          });
    });
};

let route;
console.log('route', route);

export { getDirection }

