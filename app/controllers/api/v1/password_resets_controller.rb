class Api::V1::PasswordResetsController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def new
         
    end

    def create
        @user = User.find_by(email: params[:email])
        
        if @user
            #send email
            
            PasswordMailer.with(user: UserSerializer.new(@user)).reset.deliver_now
            render json: {ok: 'did something'}, status: :ok
        else
            render json: {error: 'NOT FOUND'}
        end
    end

end
