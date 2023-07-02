class Intervention < ApplicationRecord
    belongs_to :user 
    has_many :goal_interventions, dependent: :destroy
end
