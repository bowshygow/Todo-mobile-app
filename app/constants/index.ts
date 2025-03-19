export const STORAGE_KEYS = {
  TODOS: 'todos',
  DARK_MODE: 'darkMode',
  SHOW_COMPLETED: 'showCompleted',
} as const;

export const INITIAL_TODOS = [
  { id: '1', text: 'Learn React Native', completed: false },
  { id: '2', text: 'Build Todo App', completed: false }
]; 