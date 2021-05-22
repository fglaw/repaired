class RepairsController < ApplicationController
  def index
    @repairs = Repair.all
    authorize @repairs
  end
end
