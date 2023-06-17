class ClientSerializer < ActiveModel::Serializer
  attributes :id, :client_name, :active, :description
  has_many :goals
end
