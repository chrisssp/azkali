export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'kali';
  timestamp: Date;
}

export interface QuickAction {
  id: string;
  label: string;
  iconName: string;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, sender: 'user' | 'kali') => void;
  clearMessages: () => void;
}
