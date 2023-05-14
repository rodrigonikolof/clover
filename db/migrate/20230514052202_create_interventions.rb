class CreateInterventions < ActiveRecord::Migration[7.0]
  def change
    create_table :interventions do |t|
      t.string :intervention_name
      t.text :intervention_description
      t.integer :user_id

      t.timestamps
    end
  end
end
