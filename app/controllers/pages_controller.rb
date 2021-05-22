class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def dashboard
    if current_user.user_mechanic
      active_bookings = Booking.where("mechanic_id = ? AND status = ?", current_user.id, "accepted")
      @active_booking = active_bookings.first
      
      if active_bookings.length >  1
        active_bookings.shift
        @queued_bookings = active_bookings
      else
        @queued_bookings = [] 
      end
    
      
      @pending_bookings = Booking.where("mechanic_id = ? AND status = ?", current_user.id, "pending")
      @history_bookings = Booking.where("mechanic_id = ? AND status = ?", current_user.id, "completed")

    else
    @history_bookings = Booking.where("user_id = ? AND status = ?", current_user.id, "completed")
    @active_bookings = Booking.where("user_id = ? AND status = ? OR status = ?", current_user.id, "pending", "accepted")
    
    end
  end

end
