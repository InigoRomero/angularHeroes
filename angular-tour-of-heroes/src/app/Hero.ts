import { Villain } from './Villain';

export interface Hero {
    idHeroe: number;
    name: string;
    weapon: string;
    city: string;
    description: string;
    villains: Array<Villain>;
  }