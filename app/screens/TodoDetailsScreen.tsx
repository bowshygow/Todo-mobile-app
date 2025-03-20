import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTodos } from '../hooks/useTodos';
import { theme } from '../styles/theme';

export default function TodoDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { todos } = useTodos();
  
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Todo not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Todo Details</Text>
        <Text style={[
          styles.todoText,
          todo.completed && styles.completedText
        ]}>
          {todo.text}
        </Text>
        <Text style={styles.status}>
          Status: {todo.completed ? 'Completed' : 'Pending'}
        </Text>
        <Text style={styles.id}>ID: {todo.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
  card: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    ...theme.typography.title,
    marginBottom: theme.spacing.medium,
  },
  todoText: {
    ...theme.typography.body,
    marginBottom: theme.spacing.medium,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  status: {
    ...theme.typography.body,
    color: theme.colors.primary,
    marginBottom: theme.spacing.small,
  },
  id: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    fontSize: 12,
  },
  errorText: {
    ...theme.typography.body,
    color: theme.colors.error,
    textAlign: 'center',
  },
}); 