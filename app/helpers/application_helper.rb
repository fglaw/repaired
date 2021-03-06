module ApplicationHelper

  def get_coords(location_string)
    
    if location_string.is_a? String  
      location_string.gsub(/\[|\]/, "").split(",")
    else
      location_string
    end
    
  end

# creating hash to parse on to mapbox
def location_markers(booking)
  location_array = get_coords(booking.location) 
  @customer_marker = {
      
      lat: location_array[0].to_f,
      lng: location_array[1].to_f,
      who: 'customer'
  }
  location_array = get_coords(current_user.current_location)
  @mechanic_marker = {
      
      lat: location_array[0],
      lng: location_array[1],
      who: 'mechanic'
  }
  # returning markers for mapbox
  @markers = [@customer_marker, @mechanic_marker] 
end



end
