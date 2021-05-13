class RepairsController < ApplicationController
  def index
    @repairs = Repair.all
  end
end
