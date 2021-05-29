module ApplicationHelper

  # extracting coords from seeds
def get_coords(location_string)
  location_string.gsub(/\[|\]/, "").split(",")
end

# creating hash to parse on to mapbox
def location_markers(booking)
  location_array = get_coords(booking.location) 
  @customer_marker = {
     
      lat: location_array[0],
      lng: location_array[1],
      who: 'customer'
  }
  location_array = get_coords(booking.mechanic.current_location)
  @mechanic_marker = {
      
      lat: location_array[0],
      lng: location_array[1],
      who: 'mechanic'
  }
  # returning markers for mapbox
  @markers = [@customer_marker, @mechanic_marker] 
end



end
