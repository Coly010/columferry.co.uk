export interface BookListing {
  title: string;
  publishedDate: Date;
  blurb: string;
  amazonLink: string;
  image: string;
  wip?: boolean;
}

export interface MappedBookListing {
  title: string;
  publishedDate: string;
  blurb: string;
  amazonLink: string;
  image: string;
  wip?: boolean;
}

export const books: BookListing[] = [
  {
    title: "The Blackstone Legacy",
    blurb: `In the city of Arcanum, where magic is a way of life, the Mage Guild is the guardian of peace and order. But when the Goblins, a race of powerful and dangerous magic users, present a threat to the citizens of Arcanum, the Guild Defense Unit, an elite group of mages, is called to action. Led by the formidable High Elder Arcanos, the Defence Unit launches a surprise attack on the Goblins, hoping to crush them once and for all. But the Goblins are not so easily defeated, and the battle quickly becomes a fierce and deadly struggle. As the two sides clash, the fate of Arcanum hangs in the balance.

But is everything as it seems?

Lucas Greystone, a mage-in-training, is summoned to go on his Graduation Challenge to investigate a dragon attack in the nearby village of Willowdale. He soon realises he's stumbling into a mystery much more extreme as he discovers dark secrets about the Guild itself.`,
    publishedDate: new Date("January 2, 2023"),
    amazonLink:
      "https://www.amazon.co.uk/Blackstone-Legacy-Colum-Ferry/dp/B0BRDCPVXK/",
    image: "books/the-blackstone-legacy.jpg",
  },
];
