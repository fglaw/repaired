require 'json'

class BookingsController < ApplicationController
  before_action :set_repair, only: [:new, :create]

  def index
    @bookings = policy_scope(Booking)
  end

  def show
    @booking = Booking.find(params[:id])
    @repair = Repair.find(params[:repair_id])
    authorize @booking
    @review = Review.new

    # Mechanic markers in show page for customer
    @mechanics_locations = User.where(user_mechanic: true)[0..11].map { |user| user.current_location }
    @markers = []
    @mechanics_locations.each do |location|
      # JSON parse => string of array to array
        array = JSON.parse(location)
        @markers << {
          lon: array.last,
          lat: array.first,
          image_url: helpers.asset_url("https://res.cloudinary.com/ddk6eqs6l/image/upload/v1622891551/i4ltbqhwlljnfxiqzvp1.png")
        }
    end
    @markers
    # Mechanic marker in show page for the mechanic
    @mechanic_marker = []
    arr = JSON.parse(current_user.current_location)
    @mechanic_marker << {
      lon: arr.last,
      lat: arr.first
    }
    @mechanic_marker

    # customer marker 
    @customer_marker = []
    customer_array = JSON.parse(@booking.location)
    # raise
    if @booking.location != ""
      @customer_marker << {
        lon: customer_array.last,
        lat: customer_array.first,
        bookingid: @booking.id
      }
      @customer_marker
    else 
      @customer_marker = {
        lng: 13.4050,
        lat: 52.5200
      }
      @customer_marker
    end 
  end

  def new
    #  GET /repairs/1/bookings/new
    @booking = Booking.new
    authorize @booking
    @booking.repair = @repair
    @booking.user = current_user
    # @booking.location = current_user.current_location
  end

  def create
    #  POST /repairs/1/bookings
    @booking = Booking.new(booking_params)
    authorize @booking
    @booking.repair = @repair
    @booking.user = current_user
    # @booking.location = current_user.current_location
    @booking.mechanic_id = User.where(name: "Fabian Fixit").first.id
      if @booking.save
        redirect_to repair_booking_path(@repair, @booking), notice: 'Booking was successfully created'
      else
        render :new
      end
    end

    def update
      @booking = Booking.find(params[:id])
      authorize @booking
      if params["status"] == "declined"

        @booking.mechanic = random_mechanic
        @booking.save
      redirect_to dashboard_path
      elsif params["status"] == "completed"

        @booking.status = params["status"]
        @booking.save
        redirect_to dashboard_path
      else
        @booking.status = params["status"]
        @booking.save
        redirect_to repair_booking_path(@booking.repair, @booking)
      end
      
    end

    private

    def random_mechanic
      User.where(user_mechanic: true).sample
    end

    def booking_params
        params.require(:booking).permit(:repair_id, :mechanic_id, :location, photos: [])
    end

    def set_repair
      @repair = Repair.find(params[:repair_id])
    end

    def find_repair
      @repair = Repair.find(params[:format])
    end
end
