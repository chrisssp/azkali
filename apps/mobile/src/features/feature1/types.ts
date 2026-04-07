export interface Feature1Item {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'pending' | 'completed';
  createdAt: string;
}

export interface Feature1Data {
  items: Feature1Item[];
  total: number;
}
