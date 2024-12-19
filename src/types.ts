export interface Message {
  role: string
  content: string
}

export enum Action {
  SUMMARIZE = 'SUMMARIZE',
}
