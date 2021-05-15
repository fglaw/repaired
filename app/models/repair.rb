class Repair < ApplicationRecord
    has_many :bookings
    # validates :type, :price, :duration, :level, :image_url, presence: true
end
