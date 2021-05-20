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
        lng: 13.4050
    }

    @mechanic_marker = {
        lat: 52.4125,
        lng: 12.5316
    }
    @markers = [@customer_marker, @mechanic_marker]
  end

    def new
        #  GET /repairs/1/bookings/new
        @booking = Booking.new
        authorize @booking
        @booking.repair = @repair
    end

    def create
        #  POST /repairs/1/bookings
        @booking = Booking.new(booking_params)
        authorize @booking
        @booking.repair = @repair
        @booking.user = current_user
        if @booking.save
            # for now redirect to homepage
            redirect_to repair_booking_path(@repair, @booking), notice: 'Booking was successfully created'
        else
            render :new
        end
    end

  private

    def booking_params
        params.require(:booking).permit(:location, :repair_id, :mechanic_id, photos: [])
    end

    def set_repair
      @repair = Repair.find(params[:repair_id])
    end
end
