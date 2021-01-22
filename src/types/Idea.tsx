import { GenreTag, InitGenreTag } from "./GenreTag";
import { IdeaTag, InitIdeaTag } from "./IdeaTag";

export interface Idea {
  id:        number;
  icon:      string;
  title:     string;
  detail:    string;
  priority:  number;
  genreTags: GenreTag[];
  ideaTags:  IdeaTag[];
  followers: MultiIdea;
  status:    number;
  createdAt: string;
  updatedAt: string;
}

class MultiIdea extends Array<Idea> { }

export class InitIdea implements Idea {
  id        = 0;
  icon      = '';
  title     = '';
  detail    = '';
  priority  = 0;
  genreTags = Array<InitGenreTag>();
  ideaTags  = Array<InitIdeaTag>();
  followers = new MultiIdea();
  status    = 0;
  createdAt = '';
  updatedAt = '';
}