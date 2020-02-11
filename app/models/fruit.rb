class Fruit < ApplicationRecord
  validates :name, :description, presence: true
end
