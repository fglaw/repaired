class RepairsController < ApplicationController
  before_action :find_repair, only: [:show]

  def index
    @repairs = Repair.all
    authorize @repairs
  end

  def show
  end

   def location
    @customer_marker = {
      lat: 52.5200,
      lng: 13.4050
    }

    set_repair
    authorize @repair
  end

  private

  def find_repair
    @repair = Repair.find(params[:id])
    authorize @repair
  end

  def set_repair
    @repair = Repair.find(params[:repair_id])
    authorize @repair
  end
end
