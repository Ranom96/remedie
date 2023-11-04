import * as React from 'react';
import { SafeAreaView, Text, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import Header from '../components/Header';
import ExibirConsultas from '../components/ExibirConsultas';

export default function Remedios({ props, navigation }) {

  const TextStyle = {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '400',
    marginHorizontal: 24,
    paddingTop: 16,
  };

  const botaoStyle = {
    backgroundColor: '#007AFF',
    borderRadius: 24,
    position: 'absolute',
    bottom: 16,
  };

  const data = [
    {
      id: '1',
      nomeRemedio: 'Dipirona',
      horario: '14h30',
      dosagem: '1 comprimido',
    },
    {
      id: '2',
      nomeRemedio: 'Nimesulida',
      horario: '12h45',
      dosagem: '1 comprimido',
    },
  ];

  return (
    <>
      <Header title="Remédios" />
      <Text style={TextStyle}>Remédios do dia</Text>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', marginTop: 24 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExibirConsultas dado1={item.nomeRemedio} dado2={item.horario} dado3={item.dosagem} />
          )}
        />
        <Button style={botaoStyle} onPress={() => navigation.navigate('RemediosCadastrar')}>
          <Text style={{ color: 'white', fontSize: 24, paddingTop: 8 }}>+</Text>
        </Button>
      </SafeAreaView>
    </>
  );
}
