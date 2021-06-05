import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const moveMarker = (map, route) => {
    console.log('moveMarker function is calling!')
    console.log('route', route);
    let marker = null;
    marker = new mapboxgl.Marker({
        color: 'red'
    })
          .setLngLat([ route[0][0], route[0][1] ])
          .addTo(map)
    let length = route.length;
    // let i;
    
    for( let i = 0; i < length; i++) {
        marker.remove()

        console.log(route[i]);
        console.log('length', route.length);

            setTimeout(function(){
                console.log('---- i ', i);

                marker.remove()
                marker = new mapboxgl.Marker()
                .setLngLat([ route[i][0], route[i][1] ])
                .remove()
                marker.addTo(map)
          }, 600 * i);
    }
};

export { moveMarker }; 
