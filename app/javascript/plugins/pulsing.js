import mapboxgl from 'mapbox-gl';

var framesPerSecond = 15; 
var initialOpacity = 1
var opacity = initialOpacity;
var initialRadius = 8;
var radius = initialRadius;
var maxRadius = 18;

const pulsingMarker = (map, customer_marker) => {
    console.log(customer_marker[0]);
     console.log('---pulsingMarker is in init_mapbox')
     map.on('load', () => {
          map.addSource('point', {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": [
                  customer_marker[0],
                  customer_marker[1]
                ]
            }
          });
          map.addLayer({
              "id": "point",
              "source": "point",
              "type": "circle",
              "paint": {
                  "circle-radius": initialRadius,
                  "circle-radius-transition": {duration: 0},
                  "circle-opacity-transition": {duration: 0},
                  "circle-color": "#63488C"
              }
          });
    
          map.addLayer({
              "id": "point1",
              "source": "point",
              "type": "circle",
              "paint": {
                  "circle-radius": initialRadius,
                  "circle-color": "#6558A6"
              }
          });
    
          function animateMarker(timestamp) {
            setTimeout(function(){
                requestAnimationFrame(animateMarker);
    
                radius += (maxRadius - radius) / framesPerSecond;
                opacity -= ( .9 / framesPerSecond );
    
                map.setPaintProperty('point', 'circle-radius', radius);
                if(opacity > 0) {
                  map.setPaintProperty('point', 'circle-opacity', opacity);
                }
                
                if (opacity <= 0) {
                    radius = initialRadius;
                    opacity = initialOpacity;
                } 
    
            }, 1000 / framesPerSecond);
          }

          // const bounds = new mapboxgl.LngLatBounds();
          // bounds.extend([customer_marker[0], customer_marker[1]])
          // map.fitBounds(bounds, { padding: 0, maxZoom: 15, duration: 0 });

          animateMarker(0);
        })
};

export { pulsingMarker };
