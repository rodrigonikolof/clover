class AddCompletedToGoalInterventions < ActiveRecord::Migration[7.0]
  def change
    add_column :goal_interventions, :completed, :boolean, default: false
  end
end
