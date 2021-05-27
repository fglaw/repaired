class BookingsController < ApplicationController
  before_action :set_repair, only: [:new, :create]

  def show
    @booking = Booking.find(params[:id])
    @repair = Repair.find(params[:repair_id])
    authorize @booking
    @review = Review.new
    # for geocode
    @customer_marker = {
        lat: 52.5200,
        lng: 13.4050,
        who: 'customer'
    }

    @mechanic_marker = {
        lat: 52.529614,
        lng: 13.401874,
        who: 'mechanic'
    }
    @markers = [@customer_marker, @mechanic_marker]
  end

  def new
    #  GET /repairs/1/bookings/new
    @booking = Booking.new
    authorize @booking
    @booking.repair = @repair
    @booking.user = current_user
    # for geocode
    @customer_marker = {
      lat: 52.5200,
      lng: 13.4050
    }
  end

  def create
    #  POST /repairs/1/bookings
    @booking = Booking.new(booking_params)
    authorize @booking
    @booking.repair = @repair
    @booking.user = current_user
    @booking.mechanic_id = User.where(name: "Fabian Fixit").first.id
      if @booking.save
        redirect_to repair_booking_path(@repair, @booking), notice: 'Booking was successfully created'
      else
        render :new
      end
    end

    private

    def booking_params
        params.require(:booking).permit(:repair_id, :mechanic_id, photos: [])
    end

    def set_repair
      @repair = Repair.find(params[:repair_id])
    end
end
