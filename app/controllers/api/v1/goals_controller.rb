class Api::V1::GoalsController < ApplicationController

    def index
        @goals = Goal.where(client_id: params[:client_id])
        render json: @goals, status: :ok
    end

end
