class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :status, :activated
end
