class Api::V1::GoalInterventionController < ApplicationController

    def show
        @gi = GoalIntervention.find(params[:id])

        if @gi && gi.goal.client.user.id == current_user.id
            render json: @gi, status: :ok
        else
            render json: {error: 'Failed to fetch Goal Intervention'}
        end
    end

    def create
        @gi = GoalIntervention.create(goal_intervention_params)

        if @gi.valid?
            render json: @gi, status: :created
        else
            render json: {error: 'Could not create Goal Intervention'}, status: :unprocessable_entity
        end

    end 

private

    def goal_intervention_params
        params.require(:goal_intervention).permit(:goal_id, :intervention_id)
    end

end
