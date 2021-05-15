class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :photo
  has_many :bookings_as_user, class_name: "Booking", foreign_key: :user_id
  has_many :bookings_as_mechanic, class_name: "Booking", foreign_key: :mechanic_id
end
