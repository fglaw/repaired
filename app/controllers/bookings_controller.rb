class BookingsController < ApplicationController
    before_action :set_repair, only: [:new, :create]

    def new
        #  GET /repairs/1/bookings/new
        @booking = Booking.new
        authorize @booking
    end

    def create
        #  POST /repairs/1/bookings
        @booking = Booking.new(booking_params)
        authorize @booking
        @booking.repair = @repair
        @booking.user = current_user
        if @booking.save!
            # for now redirect to homepage
            redirect_to root_path notice: 'Booking was successfully created'
        else
            render :new
        end
    end

    private

    def booking_params
        params.require(:booking).permit(:repair_id, photos: [])
    end

    def set_repair
        @repair = Repair.find(params[:repair_id])
    end
end
