import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import RobotListScreen from './RobotListScreen';

export default function App(){
  const [screen, setScreen] = React.useState('home');
  return (
    <View style={styles.container}>
      {screen === 'home' ? (
        <View style={{alignItems:'center'}}>
          <Text style={styles.title}>LogiTrack</Text>
          <Text style={{opacity:0.7, marginBottom:16}}>Monitoramento de Robôs Logísticos</Text>
          <Button title="VER ROBÔS" onPress={() => setScreen('robos')} />
          <Text style={{marginTop:24, opacity:0.6}}>Backend em http://localhost:8081/api</Text>
          <Text style={{opacity:0.6}}>Expo Web em http://localhost:8082</Text>
        </View>
      ) : (
        <RobotListScreen onBack={() => setScreen('home')} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, justifyContent:'center', alignItems:'center' },
  title:{ fontSize:32, fontWeight:'800', marginBottom:8 }
});
