export interface Place {
  name: string;
  city: string;
  state: string;
  type: string;
  category: string;
  bestTime: string;
  duration: string;
  tip: string;
  wikiTitle: string;
  mediaSearch: string;
  info: string;
  aliases: string[];
}

export interface Destination {
  state: string;
  city: string;
  type: string;
  aliases: string[];
  curated: boolean;
}
