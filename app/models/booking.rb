class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :repair
  has_many_attached :photos
  has_many :reviews, dependent: :destroy
  validates :location, :status, presence: true
end
