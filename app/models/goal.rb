class Goal < ApplicationRecord
    belongs_to :client
    has_many :goal_intervention
end
