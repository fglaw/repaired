# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'uri'
require "faker"
require "random-location"



def mechanic?
  rand(3) === 2
end

def set_status
  i = rand(6)
    if i == 0
      "accepted"
    elsif i == 1
      "pending"
    else
      "completed"
    end
end

def generate_booking_user
  user_array = User.where(user_mechanic: false)
  user_array[rand(user_array.length)]
end

def generate_booking_mechanic
  user_array = User.where(user_mechanic: true)
  user_array[rand(user_array.length)]
end

puts 'Cleaning database...'
Booking.destroy_all
Repair.destroy_all
User.destroy_all
puts 'database is clean'

user_photo_url = "https://kitt.lewagon.com/placeholder/users/random"

puts "random customer creation"
2.times do
  User.create!(
    email: Faker::Internet.email,
    password: "123456",
    name: Faker::Name.name ,
    user_mechanic: false,
    current_location: RandomLocation.near_by(52.5200, 13.4050, 10000),
    level: rand(4),
    rating: rand(6)
  )
end

puts "Creating user 1"

customer = User.create!(
    email: "customer@user.com",
    password: "123456",
    name: "Hans Müller",
    user_mechanic: false,
    current_location: RandomLocation.near_by(52.5200, 13.4050, 10000)
  )



puts "Creating user 2"
mechanic = User.create!(
    email: "mechanic@user.com",
    password: "123456",
    name: "Fabian Fixit",
    user_mechanic: true,
    level: 3,
    current_location: "[52.506747, 13.390752]",
    rating: 4.8
  )

puts "Cleaning repairs"
Repair.destroy_all
puts "Creating repairs"

repair1 = Repair.create!(
    repair_type: 'Flat Tyre',
    price: 12,
    duration: 20,
    level: 1,
    image_url: "https://source.unsplash.com/nLtIx9xmGxE",
  )
Repair.create!(
  repair_type: 'Gears Alignment',
  price: 15,
  duration: 30,
  level: 2,
  image_url: "https://images.unsplash.com/photo-1525104325683-eb7d21279760?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1510&q=80",
)
Repair.create!(
    repair_type: 'Wheel repair',
    price: 35,
    duration: 40,
    level: 3,
    image_url: "https://images.unsplash.com/photo-1592222166121-93437e78d8d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2252&q=80",
  )

  repair1 = Repair.create!(
    repair_type: 'Brake tuning',
    price: 10,
    duration: 15,
    level: 1,
    image_url: "https://images.unsplash.com/photo-1603300449700-4f656e570429?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    )

Repair.create!(
  repair_type: 'New bell & install',
  price: 8,
  duration: 5,
  level: 1,
  image_url: "https://images.unsplash.com/photo-1481106839235-a2c71e2564de?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1652&q=80",
  )

Repair.create!(
  repair_type: 'Health Check',
  price: 25,
  duration: 30,
  level: 2,
  image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80",
)

Repair.create!(
  repair_type: 'Unkonwn Issue',
  price: 50,
  duration: 60,
  level: 3,
  image_url: "https://images.unsplash.com/photo-1551366612-efd0dd97e49c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
)
puts "Created repairs"

puts 'Creating booking 1'
Booking.create!(
    location: RandomLocation.near_by(52.5200, 13.4050, 10000),
    status: "accepted",
    user_id: customer.id,
    repair_id: Repair.all.first.id,
    mechanic_id: mechanic.id
  )

  puts "creating bookings for fabian fixit"


# adding 1 pending booking for fabian
    loca_array = RandomLocation.near_by(52.5200, 13.4050, 10000)
    Booking.create!(
      location: loca_array[0].to_s + ", " + loca_array[1].to_s,
      status: "pending",
      user_id: User.where(user_mechanic: false).sample.id,
      repair_id: Repair.all.sample.id,
      mechanic_id: mechanic.id
   )


  10.times do
    Booking.create!(
      location: RandomLocation.near_by(52.5200, 13.4050, 10000),
      status: "completed",
      user_id: User.where(user_mechanic: false).sample.id,
      repair_id: Repair.all.sample.id,
      mechanic_id: mechanic.id
   )
  end




puts "attaching photos to users"

User.all.each do |user|
  file = URI.open(user_photo_url)
  user.photo.attach(io: file, filename: "user.jpg", content_type: 'image/jpg')
  user.save
end

puts 'Seed complete'
# https://source.unsplash.com/800x600/?broke,bike


