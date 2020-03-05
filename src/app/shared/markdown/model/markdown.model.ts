export interface MarkdownListModel {
  id: string;
  completed: boolean;
  editable?: boolean;
  startDate?: string;
  endDate?: string;
  text: string;
  originText?: string;
  context?: string;
  priority?: string;
  mail?: string;
  value?: number;
  tag?: string[];
}

