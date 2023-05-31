class GoalInterventionSerializer < ActiveModel::Serializer
  attributes :id, :goal_id, :intervention_id
  has_one :intervention
end
