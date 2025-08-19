import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { api } from './services/api';

export default function RobotListScreen({ onBack }){
  const [items, setItems] = React.useState([]);
  const [error, setError] = React.useState(null);

  const load = async () => {
    try{
      setError(null);
      const res = await api.get('/robos');
      setItems(Array.isArray(res.data) ? res.data : []);
    }catch(e){
      setError(e?.message || 'Erro');
      setItems([]);
    }
  };

  React.useEffect(() => { load(); }, []);

  return (
    <View style={{ flex:1, padding:16, width:'100%', maxWidth:800 }}>
      <Button title="Voltar" onPress={onBack} />
      <Text style={styles.debug}>API: {api.defaults.baseURL}</Text>
      {error && <Text style={{color:'red'}}>Erro: {String(error)}</Text>}
      <FlatList
        data={items}
        keyExtractor={it => String(it.id)}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nome}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Bateria: {item.bateria}%</Text>
            <Text>Localização: {item.ultimaLocalizacao || '-'}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{textAlign:'center', marginTop:24}}>Nenhum robô encontrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card:{ borderWidth:1, borderColor:'#ddd', padding:12, borderRadius:12, marginVertical:8, backgroundColor:'white' },
  name:{ fontSize:18, fontWeight:'700', marginBottom:6 },
  debug:{ fontSize:12, opacity:0.6, marginVertical:8 }
});
