import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { TodoItemProps } from '../types';
import { theme } from '../styles/theme';

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: '/screens/TodoDetailsScreen',
      params: { id: todo.id }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={handlePress}
      >
        <Text style={[
          styles.todoText,
          todo.completed && styles.completedText
        ]}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.small,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    ...theme.typography.body,
    color: theme.colors.text,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  deleteButton: {
    padding: theme.spacing.small,
    backgroundColor: theme.colors.error,
    borderRadius: theme.borderRadius.small,
  },
  deleteButtonText: {
    ...theme.typography.body,
    color: theme.colors.background,
  },
}); 