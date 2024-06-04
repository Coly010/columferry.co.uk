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
  {
    title: "Tutarium: The Rise of Demons",
    publishedDate: new Date(),
    blurb: `Strange events continue to arise in Osgrua. Sightings of balls of black flame containing what can only be described as a monster clawing to escape. Such events are so ludicrous they've been ignored and the reporters' sanity questioned.
    
Never before has Osgrua encountered such happenings. 
    
Vivrel Ginlo, an elf holding the position of The Protector of the Realm on the Grand Elven Council stands alone in his belief that these events are linked to his theories that demons exist in this world and that they've been trying to break through into the living realm for centuries.
    
With no mention of demons existing in recorded history, he faces constant criticism from his fellow Council members.
    
Steadfast in his belief, he chases down the latest series of reports and discovers so much more than he could have bargained for.`,
    amazonLink: "",
    image: "",
    wip: true,
  },
];
