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

    def show
        @client = Client.find(params[:id])

        if @client && @client[:user_id] == current_user.id
            render json: @client, status: :ok
        else
            render json: {error: 'Failed to fetch client'}
        end
    end

    def update
        @client = Client.find(params[:id])

        if @client && client[:user_id] == current_user.id
            @client.update(client_params)
            render json: @client, status: :ok
        else
            render json: {error: 'Unable to update client'}
        end
    end

    private

    def client_params
        params.require(:client).permit(:client_name, :user_id, :active, :description)
    end

end
