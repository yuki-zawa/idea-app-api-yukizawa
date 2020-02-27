module Api
  module V1
    class UsersController < ApplicationController

      def index
        if !(params[:page] && params[:limit])
          render status: 400, :json => { status: "400", message: "page and limit required" }
          return
        end

        # pagination
        page = params[:page] ? params[:page].to_i : 1
        limit = params[:limit] ? params[:limit].to_i : 25
        offset = limit * (page - 1);

        render :json => User.limit(limit).offset(offset), :each_serializer => UserSerializer
      end

      def show
        render :json => User.find(params[:id]), :serializer => UserSerializer
      end

      def create

      end

      def destroy

      end

      def update

      end

      private

    end
  end
end