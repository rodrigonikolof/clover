class User < ApplicationRecord
    has_secure_password
    validates :name, :email, :password, presence: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 6}
    
    has_many :clients
    has_many :interventions
end
