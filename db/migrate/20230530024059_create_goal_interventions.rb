class CreateGoalInterventions < ActiveRecord::Migration[7.0]
  def change
    create_table :goal_interventions do |t|
      t.integer :goal_id
      t.integer :intervention_id

      t.timestamps
    end
  end
end
