import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Todo, TodoStats } from '../types';
import { STORAGE_KEYS, INITIAL_TODOS } from '../constants';
import { handleAsyncError } from '../utils/error';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<TodoStats>({ total: 0, completed: 0 });

  // Load todos when hook is initialized
  useEffect(() => {
    loadTodos();
  }, []);

  // Update stats whenever todos change
  useEffect(() => {
    updateStats();
  }, [todos]);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const savedTodos = await handleAsyncError(
        AsyncStorage.getItem(STORAGE_KEYS.TODOS),
        'loadTodos'
      );
      
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateStats = () => {
    setStats({
      total: todos.length,
      completed: todos.filter(todo => todo.completed).length
    });
  };

  const addTodo = async (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false
    };

    const newTodos = [...todos, newTodo];
    await handleAsyncError(
      AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(newTodos)),
      'addTodo'
    );
    setTodos(newTodos);
  };

  const deleteTodo = async (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    await handleAsyncError(
      AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(newTodos)),
      'deleteTodo'
    );
    setTodos(newTodos);
  };

  const toggleTodo = async (id: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await handleAsyncError(
      AsyncStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(newTodos)),
      'toggleTodo'
    );
    setTodos(newTodos);
  };

  return {
    todos,
    stats,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    loadTodos
  };
} 