class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def dashboard
    if current_user.user_mechanic
      active_bookings = Booking.where("mechanic_id = ? AND status = ?", current_user.id, "accepted")
      @active_booking = active_bookings.first
      
      if active_bookings.kind_of?(Array)
        active_bookings.delete_at(0)
        @queued_bookings = active_bookings
      else
        @queued_bookings = [] 
      end
    
      
      @pending_bookings = Booking.where("mechanic_id = ? AND status = ?", current_user.id, "pending")
      
      @history_bookings = Booking.where("mechanic_id = ? AND status = ?", current_user.id, "completed")
      @total_earnings = @history_bookings.map {|booking| booking.repair.price}.sum

    else
    @history_bookings = Booking.where("user_id = ? AND status = ?", current_user.id, "completed")
    @active_bookings = Booking.where("user_id = ? AND status = ? OR status = ?", current_user.id, "pending", "accepted")
    
    end
  end

end
