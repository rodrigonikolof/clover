class RemoveDescriptionFromInterventions < ActiveRecord::Migration[7.0]
  def change
    remove_column :interventions, :intervention_description
  end
end
