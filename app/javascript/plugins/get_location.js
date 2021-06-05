const getLocation = () => {
    const locationElement = document.getElementById("location");
    
    if (locationElement) {
        console.log('location Element',locationElement);
    
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('position', position);
            // fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            //     .then((response) => {       
            //         return response.text();
            //     })
            const lon = position.coords.longitude
            const lat = position.coords.latitude
            const LonLatArray = [ lon, lat ]
            console.log(LonLatArray);    
            locationElement.value=LonLatArray
            console.log('value', typeof locationElement.value, locationElement.value);
            document.getElementById("book-button").disabled = false;
        }, () => {
            console.log("error here")
        });
    }
    
}

export { getLocation };