class Api::V1::PasswordResetsController < ApplicationController
    skip_before_action :authorized, only: [:create, :update]

    

    def create
        @user = User.find_by(email: params[:email])
        
        if @user
            #send email
            @user.reset_password_token = generate_token
            @user.reset_password_sent_at = Time.now.utc
            @user.save!(validate: false)

            PasswordMailer.with(user: UserSerializer.new(@user)).reset.deliver_now
            render json: {ok: 'did something'}, status: :ok
        else
            render json: {error: 'NOT FOUND'}
        end
    end


    def update
        @user = User.find_by(email: params[:email])
        
        if @user 
            if password_token_valid?(params[:token], @user)
            # @user.reset_password_token == params[:token].to_s
                render json: {ok: 'all good'}, status: :ok
            else
                render json: {error: 'token expired'}, status: :unprocessable_entity
            end

        else 
            render json: {error: 'NOT FOUND'}
        end

    end


    private

    def generate_token
        SecureRandom.hex(10)
    end

    def password_token_valid?(token, user)
        user.reset_password_token == token.to_s && (user.reset_password_sent_at + 15.hours) > Time.now.utc
    end

    

end
