export interface Update {
  title: string;
  content: string;
  postedDate: Date;
  tags?: string[];
}

export interface MappedUpdate {
  title: string;
  content: string;
  postedDate: string;
  tags: string[];
}
