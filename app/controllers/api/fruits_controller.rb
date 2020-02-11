module Api
  class FruitsController < ApplicationController
    def index
      fruits = Fruit.all.select("id, name, description")
      render json: { status: true, fruits: fruits }
    end

    def create
      fruit = Fruit.new(fruit_params)
      if fruit.save
        render json: {status: true, fruit: fruit, message: "success create fruit"}
      else
        render json: {status: false, message: fruit.errors.full_messages.join(", ")}
      end
    end

    def show
      fruit = Fruit.find(params[:id]) rescue nil
      if fruit.present?
        render json: {status: true, fruit: fruit}
      else
        render json: {status: false, message: "Could not find fruit"}
      end
    end

    def destroy
      fruit = Fruit.find(params[:id]) rescue nil
      render json: {status: false, message: "Could not find fruit"} if fruit.blank?
      if fruit.destroy
        render json: {status: true, message: "success delete fruit"}
      end
    end

    def update
      fruit = Fruit.find(params[:id])
      if fruit.update_attributes(fruit_params)
        render json: {status: true, fruit: fruit, message: "success update fruit"}
      else
        render json: {status: false, fruit: fruit, message: fruit.errors.full_messages.join(", ")}
      end
    end

    private

    def fruit_params
      params.require(:fruit).permit(:id, :name, :description)
    end
  end
end

