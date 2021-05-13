class AddUserMechanicToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :user_machanic, :boolean
  end
end
