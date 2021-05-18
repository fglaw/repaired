class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :home ]

  def home
  end

  def dashboard
    @mechanic_bookings = Booking.where(mechanic_id: current_user.id)
    @user_bookings = Booking.where(user_id: current_user.id)
  end

end
