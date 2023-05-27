class Api::V1::GoalsController < ApplicationController

    def index
        @goals = Goal.where(client_id: params[:client_id])
        render json: @goals, status: :ok
    end

    def show
        @client = Client.find(params[:id])

        if @client && @client.user.id == current_user.id
            @goals = Goal.where(client_id: params[:id])
            render json: @goals, status: :ok
        else
            render json: {error: 'Failed to fetch client'}
        end
    end

    def update
        @goal = Goal.find(params[:id])

        if @goal && @goal.client.user.id == current_user.id
            @goal.update(goal_params)
        else
            render json: {error: 'Unable to update goal'}
        end
    end

    private

    def goal_params
        params.require(:goal).permit(:client_name, :goal_name)
    end

end
