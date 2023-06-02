class GoalInterventionSerializer < ActiveModel::Serializer
  attributes :id, :goal_id, :intervention_id, :completed
  has_one :intervention
end
