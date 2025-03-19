import { View, Text, StyleSheet, Switch, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  // Load settings when screen opens
  useEffect(() => {
    loadSettings();
  }, []);

  // Load saved settings
  const loadSettings = async () => {
    try {
      const darkMode = await AsyncStorage.getItem('darkMode');
      const showCompletedTodos = await AsyncStorage.getItem('showCompleted');
      
      if (darkMode) setIsDarkMode(JSON.parse(darkMode));
      if (showCompletedTodos) setShowCompleted(JSON.parse(showCompletedTodos));
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  // Save settings when they change
  const saveSettings = async (key: string, value: boolean) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error saving setting:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Settings Options */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={(value) => {
            setIsDarkMode(value);
            saveSettings('darkMode', value);
          }}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Show Completed Todos</Text>
        <Switch
          value={showCompleted}
          onValueChange={(value) => {
            setShowCompleted(value);
            saveSettings('showCompleted', value);
          }}
        />
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <Button 
          title="Go to Home" 
          onPress={() => router.push('/screens/HomeScreen')}
        />
        <Button 
          title="Go to Todos" 
          onPress={() => router.push('/screens/TodoScreen')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    gap: 10,
  }
}); 