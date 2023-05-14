class Api::V1::InterventionsController < ApplicationController

    def index
        @interventions = Intervention.where(user_id: current_user.id)
        render json: @interventions, status: :ok
    end

end
