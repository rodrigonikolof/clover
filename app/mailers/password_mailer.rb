class PasswordMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.password_mailer.reset.subject
  #
  def reset
  #  @token = params[:user].signed_id(purpose: "password_reset", expires_in: 15.minutes)

    # mail to: params[:user].email
    @user = params[:user].object

    # p "this is it here =>>>>>#{@user[:email]} "
    mail to: @user[:email]
    
  end
end
