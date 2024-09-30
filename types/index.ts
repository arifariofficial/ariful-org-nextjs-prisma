export enum OpenAIModel {
  DAVINCI_TURBO = "gpt-3.5-turbo",
}

export type SIPEEssay = {
  title: string;
  url: string;
  content: string;
  length: number;
  tokens: number;
  chunks: SIPEChunk[];
};

export type SIPEChunk = {
  essay_title: string;
  essay_url: string;
  content: string;
  content_length: number;
  content_tokens: number;
  embedding: number[];
};

export type SIPEJSON = {
  url: string;
  length: number;
  tokens: number;
  essays: SIPEEssay[];
};
