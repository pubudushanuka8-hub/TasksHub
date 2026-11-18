import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

const BACKGROUND_IMAGE =
  'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80';

const BANNER_IMAGE =
  'https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg';

export default function AddTask() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const saveTask = async () => {
    if (!taskName.trim() || !taskDescription.trim()) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      const tasks = storedTasks ? JSON.parse(storedTasks) : [];

      const newTask = {
        id: Date.now().toString(),
        taskName: taskName,
        taskDescription: taskDescription,
      };

      tasks.push(newTask);

      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'New Task Added',
          body: `Your task "${taskName}" has been saved.`,
        },
        trigger: null,
      });

      Alert.alert('Success', 'Task added successfully');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'Unable to save task');
    }
  };

  return (
    <ImageBackground
      source={{ uri: BACKGROUND_IMAGE }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{ uri: BANNER_IMAGE }}
          style={styles.banner}
          resizeMode="contain"
        />

        <Text style={styles.label}>Task Name</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter task name"
          value={taskName}
          onChangeText={setTaskName}
        />

        <Text style={styles.label}>Task Description</Text>

        <TextInput
          style={styles.description}
          placeholder="Enter task description"
          value={taskDescription}
          onChangeText={setTaskDescription}
          multiline
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={saveTask}
        >
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  banner: {
    width: '100%',
    height: 180,
    marginBottom: 25,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  description: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    height: 120,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});