class GenreTag < ApplicationRecord
  has_many :ideas, :through => :idea_genre_tags
end
