class PasswordResetsController < ApplicationController

    def new
         
    end

    def create
        @user = User.find_by(email: params[:email])

        if @user
            #send email
            PasswordMailer.with(user: @user).reset.deliver_now
        end
    end

end
