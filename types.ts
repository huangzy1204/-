
export interface Lesson {
  id: string;
  title: string;
  category: 'house-training' | 'behavior' | 'safety' | 'bond';
  description: string;
  steps: string[];
  ownerTip: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface RoutineTask {
  id: string;
  task: string;
  time: string;
  completed: boolean;
}
