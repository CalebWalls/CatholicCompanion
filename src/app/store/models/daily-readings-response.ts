export class DailyReadingsResponse {
  firstReading?: string;
  responsorialPsalm?: string;
  secondReading?: string;
  alleluiaVerse?: string;
  gospelReading?: string;
  url?: string;
  error?: string;
  readingSets?: ReadingSet[];
}

export interface ReadingSet {
  title: string;
  celebration?: string;
  lectionary?: string;
  note?: string;
  url: string;
  error?: string;
  sections: ReadingSection[];
}

export interface ReadingSection {
  key: string;
  title: string;
  options: { reference?: string; text: string }[];
}
