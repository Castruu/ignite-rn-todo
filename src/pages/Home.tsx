import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)) {
      return Alert.alert('Task já cadastrada!',
        'Você não consegue cadastrar uma task com o mesmo nome');
    }
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(prevTasks => [...prevTasks, task])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prevTasks => {
      const tasks = prevTasks.map(task => {
        if (task.id === id) {
          task.done = !task.done;
        }
        return { ...task };
      })
      return tasks
    })
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(prevTasks => {
      const tasks = prevTasks.map(task => {
        if(task.id === taskId) {
          task.title = taskNewTitle;
        }
        return {...task}
      })
      return tasks;
    })
  }


  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})