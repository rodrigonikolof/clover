class Client < ApplicationRecord
    validates :client_name, presence: true
end
