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
            render json: {ok: 'Intervention deleted'}, status: :ok
        else
            render json: {error: 'Unable to delete intervention'}
        end
    end

    def create
        @intervention = Intervention.create(intervention_params)

        if @intervention.valid?
            render json: @intervention, status: :created
        else
            render json: {error: 'Could not creat intervention'}, status: :unprocessable_entity
        end
    end

    private

    def intervention_params
        params.require(:intervention).permit(:intervention_name, :user_id)
    end

end
