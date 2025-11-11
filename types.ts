
export enum ArticleTone {
  INFORMATIVE = "Informative",
  WITTY_CASUAL = "Witty/Casual",
  ACADEMIC_FORMAL = "Academic/Formal",
}

export interface FormData {
  topicTitle: string;
  detailedTopic: string;
  targetAudience: string;
  seoKeywords: string;
  articleTone: ArticleTone;
}

export interface ArticleOutline {
  article_title: string;
  article_tone: string;
  seo_summary: string;
  sections: Array<{
    heading: string;
    introduction: string;
    sub_points: Array<string>;
  }>;
  conclusion_summary: string;
}
