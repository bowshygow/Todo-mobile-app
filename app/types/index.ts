export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoStats {
  total: number;
  completed: number;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
} 