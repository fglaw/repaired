Rails app generated with [lewagon/rails-templates](https://github.com/lewagon/rails-templates), created by the [Le Wagon coding bootcamp](https://www.lewagon.com) team.

- Final Project of Le Wagon Part-time Bootcamp Berlin Batch 533

## Description about "Repaired" Ruby on Rails App
- When your bike is broken, go through the following 3 Steps 
1. Make a request. 2. A Mechanic near by you comes out to help. 3. Fixed!:)

- Target: City cyclists with bicycles issues on the go; flat tires & grinding gears.
- Pain: There is limited access to quick bicycle repairs in the city.
- Solution: A web app which allows the booking of repairs on the go, at any location 24/7.

## Login infos
- Login email: customer@user.com or mechanic@user.com
- Password: 123456

## Features
Landing page to booking new page (login with customer@user.com)
- User Authentication (gem Devise) (visiter or sign-uped user?)
- User Authorization (gem Pundit) (set limitations of the usage power)
- User-side upload images and storing (gem Cloudinary)
- Image Preview after uploading
- Active Storage allows you to upload files to cloud storage and attach those files to Models. (in this project: to Booking Model)
This creates two tables in the database to handle the associations between our pictures uploaded on Cloudinary and any Model in our app.
- Uploading images for our seed file, using open-uri
- Fetching user's current location (navigator.geolocation.getCurrentPosition and Mapbox geolocate event listner)
- Mapbox API to get Direction on the map
- Mapbox Map (yarn mapbox-gl) showing map with markers
- Animating on scroll using aos.js

Dashboard page (login with mechanic@user.com)
- Mechanic can accept, decline and mark as done the booking from customers (changing status on the Booking Model [STATUSES = [ "pending", "accepted", "declined" ]])
- Mechanic can manage their earnings
- Animating Marker: Move mechanic to customer (move each Geocorfinate using looping and setTimeout)

## Available Scripts

In the project directory, you can run:

## `rails s`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

or 

Open https://www.repaired-now.com/


### Deployment

git push Heroku master
