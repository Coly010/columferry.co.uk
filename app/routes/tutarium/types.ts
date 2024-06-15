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

export interface Lore {
  title: string;
  description: string;
  postedDate: Date;
  tags?: [];
  image?: string;
}

export interface MappedLore {
  title: string;
  description: string;
  postedDate: string;
  tags?: [];
  image?: string;
  slug: string;
}
