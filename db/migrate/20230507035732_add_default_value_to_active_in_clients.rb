class AddDefaultValueToActiveInClients < ActiveRecord::Migration[7.0]
  def change
    change_column :clients, :active, :boolean, default: true
  end
end
