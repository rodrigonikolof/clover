class Api::V1::InterventionsController < ApplicationController

    def index
        @interventions = Intervention.where(user_id: current_user.id)
        render json: @interventions, status: :ok
    end

    def update
        @intervention = Intervention.find(params[:id])

        if @intervention && @intervention[:user_id] == current_user.id
            @intervention.update(intervention_params)
        else
            render json: {error: 'Unable to update intervention'}
        end
    end

    def destroy
        @intervention = Intervention.find(params[:id])

        if @intervention && @intervention[:user_id] == current_user.id
            @intervention.destroy
            head :no_content
        else
            render json: {error: 'Unable to delete intervention'}
        end
    end

    private

    def intervention_params
        params.permit(:intervention_name)
    end

end
