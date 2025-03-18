import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, Modal } from 'react-native';

interface Todo {
  id: string;
  text: string;
}

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Learn React Native' },
    { id: '2', text: 'Build Todo App' }
  ]);

  // Add new state for input text
  const [inputText, setInputText] = useState('');

  // Add state for modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to add new todo
  const addTodo = () => {
    if (inputText.trim().length === 0) return; // Don't add empty todos
    
    setTodos([
      ...todos,
      {
        id: Date.now().toString(), // Simple way to generate unique id
        text: inputText
      }
    ]);
    setInputText(''); // Clear input after adding
    setIsModalVisible(false);  // Close modal after adding
  };

  // Add delete function
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 2. Create a renderItem function
  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <TouchableOpacity 
        onPress={() => deleteTodo(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Todos</Text>
      
      {/* Add Todo Button */}
      <Button 
        title="Add New Todo" 
        onPress={() => setIsModalVisible(true)}
      />
      
      {/* Modal for adding todos */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Todo</Text>
            
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Enter new todo"
            />

            <View style={styles.modalButtons}>
              <Button 
                title="Cancel" 
                onPress={() => {
                  setIsModalVisible(false);
                  setInputText('');  // Clear input when canceling
                }}
                color="red"
              />
              <Button 
                title="Add" 
                onPress={addTodo}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* 3. Replace map with FlatList */}
      <FlatList
        data={todos}                    // Array of todos
        renderItem={renderItem}         // How to render each item
        keyExtractor={item => item.id}  // Unique key for each item
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginRight: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  todoItem: {
    flexDirection: 'row',  // Put todo text and delete button in a row
    justifyContent: 'space-between',  // Space between text and button
    alignItems: 'center',  // Center items vertically
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  todoText: {
    flex: 1,  // Take up remaining space
  },
  deleteButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: '#ff4444',
    borderRadius: 4,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Add new styles for modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',           // Take up 80% of screen width
    elevation: 5,           // Android shadow
    shadowColor: '#000',    // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});