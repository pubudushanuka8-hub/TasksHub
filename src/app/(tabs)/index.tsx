import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BACKGROUND_IMAGE =
  'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80';

export default function Dashboard() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');

      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <ImageBackground
      source={{ uri: BACKGROUND_IMAGE }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Your Tasks</Text>

        <ScrollView>
          {tasks.length === 0 ? (
            <Text style={styles.emptyText}>No tasks available</Text>
          ) : (
            tasks.map((item) => (
              <View key={item.id} style={styles.taskCard}>
                <Text style={styles.taskName}>
                  {item.taskName}
                </Text>

                <Text style={styles.taskDescription}>
                  {item.taskDescription}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/add-task')}
        >
          <Text style={styles.buttonText}>+ Add New Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
  taskCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 15,
    color: 'black',
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});