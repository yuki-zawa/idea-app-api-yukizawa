module Api
  module V1
    class AccountActivationsController < ApplicationController
      skip_before_action :authenticate!, only: :edit
      def edit
        user = User.find_by(email: params[:email])
        if user && !user.activated? && user.authenticated?(:activation, params[:id])
          user.activate
          # ここの2つのrender redirectにした方が良い？クライアント側でログイン状態にしたい
          render :json => user, :serializer => UserSerializer
        else
          render status: 400, :json => { status: "400", errors: "invalid activation link" }
        end
      end
    end
  end
end