export interface QuizAnswers {
  hasTime: string;
  location: string;
  movie: string;
  willSpendEvening: string;
}

export interface DateCustomizer {
  popcorn: string;
  drink: string;
  wish: string;
  customMessage: string;
}

export interface LoveLetter {
  id: number;
  emoji: string;
  title: string;
  content: string;
  isOpened: boolean;
}
