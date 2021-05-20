class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :repair
  belongs_to :mechanic, class_name: 'User', optional: true
  has_many_attached :photos
  has_many :reviews, dependent: :destroy
  validates :location, presence: true
  STATUSES = [ "pending", "accepted", "declined" ]
end
