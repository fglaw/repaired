class ChangeRepairTypeToRepairType < ActiveRecord::Migration[6.1]
  def change
    change_table :repairs do |t|
      t.rename :type, :repair_type
    end
  end
end
