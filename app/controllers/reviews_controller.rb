class ReviewsController < ApplicationController

    def new
        @booking = Booking.find(params[:booking_id])
        @review = Review.new
        authorize @review
    end

    def create
        @booking = Booking.find(params[:booking_id])
        @review = Review.new(review_params)
        @review.booking = @booking
        authorize @booking
        if @review.save
            redirect_to repair_booking_path(@repair, @booking)
        else
            raise
            render booking_path(@booking)
        end
    end

    private
    
    def review_params
        params.require(:review).permit(:rating)
    end
end
