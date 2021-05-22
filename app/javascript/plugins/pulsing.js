// import { mapBox } from './init_mapbox'

var framesPerSecond = 15; 
var initialOpacity = 1
var opacity = initialOpacity;
var initialRadius = 8;
var radius = initialRadius;
var maxRadius = 18;

const pulsingMarker = (map, marker) => {
     console.log('---pulsingMarker is in init_mapbox')
     map.on('load', () => {
          map.addSource('point', {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": [
                  0, 0
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
                  "circle-color": "#007cbf"
              }
          });
    
          map.addLayer({
              "id": "point1",
              "source": "point",
              "type": "circle",
              "paint": {
                  "circle-radius": initialRadius,
                  "circle-color": "#007cbf"
              }
          });
    
          function animateMarker(timestamp) {
            setTimeout(function(){
                requestAnimationFrame(animateMarker);
    
                radius += (maxRadius - radius) / framesPerSecond;
                opacity -= ( .9 / framesPerSecond );
    
                map.setPaintProperty('point', 'circle-radius', radius);
                map.setPaintProperty('point', 'circle-opacity', opacity);
    
                if (opacity <= 0) {
                    radius = initialRadius;
                    opacity = initialOpacity;
                } 
    
            }, 1000 / framesPerSecond);
          }
    
          animateMarker(0);
        })
};

export { pulsingMarker };
