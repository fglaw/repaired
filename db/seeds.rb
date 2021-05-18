# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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

puts "Creating repair 1"
repair1 = Repair.create!(
    price: 12,
    duration: 20,
    level: 1
  )

puts 'Creating booking 1'
Booking.create!(
    location: "current customer location",
    status: "accepted",
    user_id: customer.id,
    repair_id: repair1.id,
    mechanic_id: mechanic.id
  )

puts 'Seed complete'
