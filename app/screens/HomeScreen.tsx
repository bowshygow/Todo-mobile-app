import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { Stats } from '../components/Stats';
import { useTodos } from '../hooks/useTodos';
import { theme } from '../styles/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { stats, isLoading } = useTodos();

  return (
    <View style={styles.container}>
      <Stats stats={stats} />
      <Button
        title="Go to Todos"
        onPress={() => router.push('/screens/TodoScreen')}
        color={theme.colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },
}); 