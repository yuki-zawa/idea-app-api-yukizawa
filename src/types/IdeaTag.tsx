export interface IdeaTag {
  id:        number;
  name:      string;
  status:    number;
  createdAt: string;
  updatedAt: string;
}

export class InitIdeaTag implements IdeaTag {
  id        = 0;
  name      = '';
  status    = 0;
  createdAt = '';
  updatedAt = '';
}