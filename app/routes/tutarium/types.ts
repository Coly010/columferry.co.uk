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
  loreType?: LoreType;
}

export interface MappedLore {
  title: string;
  description: string;
  postedDate: string;
  tags?: [];
  image?: string;
  loreType?: LoreType;
  slug: string;
}

export type LoreType = "location" | "character" | "natural-wonder";
export const LoreTypeToText: Record<LoreType, string> = {
  location: "Locations",
  character: "Characters",
  "natural-wonder": "Natural Wonders",
};
