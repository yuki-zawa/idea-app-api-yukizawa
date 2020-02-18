class IdeaTag < ApplicationRecord
  has_many :ideas, :through => :idea_idea_tags
end
