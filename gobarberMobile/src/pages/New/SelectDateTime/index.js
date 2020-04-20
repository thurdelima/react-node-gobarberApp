import React, {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

import api from '~/services/api';

import Background from '~/components/background';
import DateTimeInput from '~/components/DateTimeInput';
import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({navigation}) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = navigation.getParam('item');





  useEffect(() =>{
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);

    }

    loadAvailable();
    //console.tron.log("HOURS: ", hours);
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
          <DateTimeInput date={date}  onChange={setDate}/>

          <HourList
            data={hours}
            keyExtractor={item => item.time}
            renderItem={({ item }) => (
              <Hour onPress={() => handleSelectHour(item.value)} enabled={item.available}>
                <Title>{item.time}</Title>
              </Hour>

            )}

          />

           <HourList>
              <Hour  >
                <Title>00:00</Title>
              </Hour>
              </HourList>


      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({navigation}) => ({
  title: 'Selecione o horário',
  headerLeft: () => (
    <TouchableOpacity onPress={()=> {
      navigation.goBack();
    }}>
      <Icon name="chevron-left" size={20} color="#fff" />
    </TouchableOpacity>
  ),
});
