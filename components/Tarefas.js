import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Keyboard, Alert, AsyncStorage} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';


export default function App() {
  
  const [task, setTask] = useState(['Escola', 'Aulas de Inglês', 'Piscina'])
  const [newTask, setNewTask] = useState('')

  async function addTask() {
    if (newTask === '') {
      return
    }
    
    const search = task.filter(task => task === newTask)

    if(search.length != 0) {
      Alert.alert('Atenção', 'Nome da tarefa já existe.')
      return
    }

    
    setTask([... task, newTask])
    setNewTask('')

    Keyboard.dismiss()
  }

  async function removeTask(item) {
    Alert.alert(
      'Deletar Tarefa', 
      "Tem certeza?",
      [
        {
          text: 'Cancela', 
          onPress: () => {
            return
          },
          style: 'cancel'
        },

        {
          text: 'OK',
          onPress: () => setTask(task.filter(tasks => tasks != item))
        }
      ], 
      { cancelable: false }
    )
  }

  useEffect(() => {
    async function loadingData() {
      const task = await AsyncStorage.getItem('task')

      if(task) {
        setTask(JSON.parse(task))
      }
    }

    loadingData()
  }, [])

  useEffect(() => {
    async function saveData() {
      AsyncStorage.setItem('task', JSON.stringify(task))
    }
    saveData()
  }, [task])

  return(
      <>
      <KeyboardAvoidingView keyboardVerticalOffset={0} behavior={'padding'} style={{flex: 1}} enabled={Platform.OS === 'ios'}>
        <View style={styles.body}>
          <FlatList 
            style={styles.flatList}
            data={task}
            keyExtractor={item => item.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.containerView}>
                <Text style={styles.text}>{item}</Text>
                <TouchableOpacity onPress={() => removeTask(item)}>
                  <MaterialIcons name="delete-forever" size={24} color="#F64C75" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <View style={styles.form}>
          <TextInput 
            style={styles.input}
            placeholderTextColor="#999"
            autoCorrect={true}
            placeholder="Adicione uma tarefa"
            maxLength={25}
            onChangeText={text => setNewTask(text)}
            value={newTask}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={() => addTask()}
          > 
            <AntDesign name="plus" size={25} color="#FFF" />
          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
      </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  }, 

  form: {
    padding: 0,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingTop: 13,
    borderTop: 1,
    borderColor: '#EEE',
    alignItems: 'flex-end'
  }, 

  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#EEE',
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#EEE'
  },

  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c6cce',
    borderRadius: 4,
    marginLeft: 10
  },

  flatList: {
    flex: 1,
    marginTop: 5
  },

  containerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 4,
    backgroundColor: '#EEE',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE'
  },

  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center'
  }
})