export interface INote {
  id: number;
  name: string;
  createdAt: string;
  content: string;
  category: string;
  status: string;
  editable?: boolean;
}

export type filterModel = 'active' | 'archived';
