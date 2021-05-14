class CreateRepairs < ActiveRecord::Migration[6.1]
  def change
    create_table :repairs do |t|
      t.string :type
      t.integer :price
      t.integer :duration
      t.integer :level
      t.string :image_url

      t.timestamps
    end
  end
end
