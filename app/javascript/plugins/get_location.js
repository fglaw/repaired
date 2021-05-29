const getLocation = () => {
    const locationElement = document.getElementById("current-location");
    locationElement.addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log('position', position);
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
            .then((response) => {       
                    return response.text();
                })
    
        });
    });
}

export { getLocation };