class Client < ApplicationRecord
    validates :client_name, presence: true
    belongs_to :user
end
