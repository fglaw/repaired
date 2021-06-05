import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const moveMarker = (map, route, mechanic_marker) => {
    console.log('moveMarker function is calling!')
    console.log('route', route);
    console.log('mechanic_marker with 0', typeof mechanic_marker[0], mechanic_marker[0]);
    console.log('mechanic_marker', typeof mechanic_marker, mechanic_marker);
    console.log('mechanic_marker', mechanic_marker[0].image_url);
    let marker = null;
    marker = new mapboxgl.Marker({
        color: 'red'
    })
          .setLngLat([ route[0][0], route[0][1] ])
          .addTo(map)

    let length = route.length;
    
    for( let i = 0; i < length; i++) {
        marker.remove()

        console.log(route[i]);
        console.log('length', route.length);

            setTimeout(function(){
                console.log('---- i ', i);
                // Create a HTML element to make this icon to bik
                const element = document.createElement('div');
                element.className = 'marker';
                element.style.backgroundImage =
                'url(https://res.cloudinary.com/ddk6eqs6l/image/upload/v1622891551/i4ltbqhwlljnfxiqzvp1.png)';
                element.style.backgroundSize = '100%';
                marker.remove()
                marker = new mapboxgl.Marker(element)
                  .setLngLat([ route[i][0], route[i][1] ])
                  .addTo(map)
          }, 600 * i);
    }
};

export { moveMarker }; 
