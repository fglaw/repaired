const getLocation = () => {
    const locationElement = document.getElementById("location");
    
    if (locationElement) {
        console.log('location Element',locationElement);
        console.log(localStorage.getItem("current_location"));
        if (localStorage.getItem("current_location") == null) {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log('position', position);
             
                const lon = position.coords.longitude
                const lat = position.coords.latitude
                console.log('lat', typeof lat, lat);    
                const LonLatArray = [lat, lon];
                console.log('LonLatArray', typeof LonLatArray, LonLatArray);
                // need to change this array to string
                const stringOfArr = JSON.stringify(LonLatArray);
                console.log('stringOfArr', typeof stringOfArr, stringOfArr);
             
                  locationElement.value = stringOfArr
                  console.log('value', typeof locationElement.value, locationElement.value);
                  document.getElementById("book-button").disabled = false; 
            },
            () => {
              console.log("error here")
            });
        } else {
            document.getElementById("book-button").disabled = false;
            const position = localStorage.getItem("current_location")
            console.log('position', position);
            locationElement.value = "[" + position + "]"
        }
    }

    
}

export { getLocation };