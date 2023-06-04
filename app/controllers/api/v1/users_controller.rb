class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def profile
        render json: { user: UserSerializer.new(current_user) }, status: :accepted
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token(user_id: @user.id)
            render json: {user: UserSerializer.new(@user), jwt: @token}, status: :created
        else
            render json: {error: 'failed to create user'}, status: :unprocessable_entity
        end
    end

    def update
        @user = User.find(params[:id])

        if @user && @user.authenticate(user_params[:password])
            @user.update(user_params)
            render json: {ok: UserSerializer.new(@user)}, status: :ok
        else
            render json: { message: 'Something went wrong' }, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:email, :password, :password_confirmation, :name, :id, :user)
    end

end
