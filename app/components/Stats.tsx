import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TodoStats } from '../types';
import { theme } from '../styles/theme';

interface StatsProps {
  stats: TodoStats;
}

export const Stats: React.FC<StatsProps> = ({ stats }) => {
  const remaining = stats.total - stats.completed;

  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{stats.total}</Text>
        <Text style={styles.statLabel}>Total</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{stats.completed}</Text>
        <Text style={styles.statLabel}>Completed</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{remaining}</Text>
        <Text style={styles.statLabel}>Remaining</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.medium,
    shadowColor: theme.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...theme.typography.title,
    color: theme.colors.primary,
  },
  statLabel: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
}); 