class Api::V1::GoalInterventionController < ApplicationController

    def show
        @gi = GoalIntervention.where(goal_id: params[:id])
    
        if @gi 
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

    def destroy
        @gi = GoalIntervention.find(params[:id])

        if @gi 
            @gi.destroy
            render json: {ok: 'Intervention deleted from goal'}, status: :ok
        else
            render json: {error: 'Unable to delete intervention from goal'}
        end
    end

private

    def goal_intervention_params
        params.require(:goal_intervention).permit(:goal_id, :intervention_id)
    end

end
