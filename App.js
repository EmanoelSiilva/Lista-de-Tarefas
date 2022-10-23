import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Tarefa from './components/Tarefas'

export default function App() {

  const image = require('./assets/bg.jpg')


  return (
    <ScrollView style={styles.container}>  
      <ImageBackground source={image} style={styles.image}>
          <View style={styles.coverView}>
            <Text style={styles.textHeader}> Lista de Tarefas</Text>
          </View>
      </ImageBackground>
      <Tarefa/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
  },
  
  image: {
    flex: 1,
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  }, 
  coverView: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  textHeader: {
    color: '#fff',  
    fontSize: 20
  }, 
});
