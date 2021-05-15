class AddMechanicToBookings < ActiveRecord::Migration[6.1]
  def change
    add_reference :bookings, :mechanic, null: false, foreign_key: { to_table: :users }
  end
end
