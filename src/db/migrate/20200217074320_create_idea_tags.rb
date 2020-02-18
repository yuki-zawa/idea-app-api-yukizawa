class CreateIdeaTags < ActiveRecord::Migration[6.0]
  def change
    create_table :idea_tags do |t|
      t.string :name

      t.timestamps
    end
  end
end
