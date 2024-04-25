export interface Article {
  id: number; // n'apparait pas dans l'HTML
  src?: string;
  alt: string;
  titre: string;
  description: string; // textarea
  lien: string;
}
