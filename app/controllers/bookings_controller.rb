class BookingsController < ApplicationController

  def show
    @booking = Booking.find(params[:id])
    authorize @booking
  end

    def new
        @booking = Booking.new
        authorize @booking
    end

    def create
        @booking = Booking.new(booking_params)
        authorize @booking
        if @booking.save!
            # for now redirect to homepage
            redirect_to root_path notice: 'Booking was successfully created'
        else
            render :new
        end
    end

    private

    def booking_params
        params.require(:booking).permit(:location, :repair_id, :user_id, photos: [])
    end
end
