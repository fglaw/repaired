class RepairsController < ApplicationController
  before_action :find_repair, only: [:show]

  def index
    @repairs = Repair.all
    authorize @repairs
  end

  def show
  end

  private

  def find_repair
    @repair = Repair.find(params[:id])
    authorize @repair
  end
end
