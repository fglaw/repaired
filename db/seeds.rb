# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'uri'

puts 'Cleaning database...'
Booking.destroy_all
Repair.destroy_all
User.destroy_all
puts 'database is clean'

puts "Creating user 1"
customer = User.create!(
    email: "customer@user.com",
    password: "123456",
    name: "Hans Müller",
    user_mechanic: false
  )

puts "Creating user 2"
mechanic = User.create!(
    email: "mechanic@user.com",
    password: "123456",
    name: "Fabian Fixit",
    user_mechanic: true,
    level: 3,
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
    image_url: "https://images.unsplash.com/photo-1549225484-ea2ff2df54de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3751&q=80",
  )
Repair.create!(
  repair_type: 'Gears Alignment',
  price: 15,
  duration: 30,
  level: 2,
  image_url: "https://images.unsplash.com/photo-1517263975512-e1e9172f466b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
)
Repair.create!(
    repair_type: 'Unkonwn Issue',
    price: 50,
    duration: 60,
    level: 3,
    image_url: "https://images.unsplash.com/photo-1551366612-efd0dd97e49c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
  )
Repair.create!(
  repair_type: 'Health Check',
  price: 25,
  duration: 30,
  level: 2,
  image_url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1504&q=80",
)
puts "Created repairs"

puts 'Creating booking 1'
Booking.create!(
    location: "current customer location",
    status: "accepted",
    user_id: customer.id,
    repair_id: repair1.id,
    mechanic_id: mechanic.id
  )

puts 'Seed complete'
