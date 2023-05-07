class Api::V1::ClientsController < ApplicationController

    def create
        @client = Client.create(client_params)
        if @client.valid?
            render json: @client, status: :created
        else
            render json: {error: 'Failed to create client'}
        end
    end

    def index
        @clients = Client.where(user_id: current_user.id)
        render json: @clients, status: :ok
    end


    private

    def client_params
        params.permit(:client_name, :user_id, :active)
    end

end
