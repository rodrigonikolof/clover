class ChangeClientIdToIntegerInGoals < ActiveRecord::Migration[7.0]
  def change
    change_column :goals, :client_id, :integer, using: 'client_id::integer'
  end
end
