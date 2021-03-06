import React, {useMemo} from 'react';
import { DatePickerAndroid } from 'react-native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {format} from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, DateButton, DateText } from './styles';
import { Date } from 'core-js';

export default function DateTimeInput({date, onChange}) {

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMM 'de' yyy", {locale: pt}),
    [date]
  );

    async function handleOpenPicker() {
      const {action, year, month, day } = await DatePickerAndroid.open({
        mode: 'spinner',
        date,
      });

      if(action === DatePickerAndroid.dateSetAction) {
        const selectedDate = new Date(year, mounth, day);

        onChange(selectedDate);
      }
    }


  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#fff" size={20} />

        <DateText>{dateFormatted }</DateText>
      </DateButton>

    </Container>
  );
}
