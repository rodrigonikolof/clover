class Api::V1::ClientsController < ApplicationController

    def create
        @client = Client.create(client_params)
        if @client.valid?
            render json: @client, status: :created
        else
            render json: {error: 'Failed to create client'}
    end


    private

    def client_params
        params.permit(:client_name, :user_id, :active)
    end

end
