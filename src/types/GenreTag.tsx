
export interface GenreTag {
  id:        number;
  name:      string;
  color:     string;
  status:    number;
  createdAt: string;
  updatedAt: string;
}

export class InitGenreTag implements GenreTag {
  id        = 0;
  name      = '';
  color     = '';
  status    = 0;
  createdAt = '';
  updatedAt = '';
}