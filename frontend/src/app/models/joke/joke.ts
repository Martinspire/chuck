/**
 * Joke class where we keep data per joke
 */
export class Joke {
  id: number; // identifier
  joke: string; // the joke as text. Might contain HTML entities
  categories: string[]; // categories to list it in
  favorite?: boolean; // is it a favorite joke?
  rating?: 1 | 2 | 3 | 4 | 5; // fixed numbers
}
