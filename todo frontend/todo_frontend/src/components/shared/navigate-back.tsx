import {Box, Theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Icon} from 'react-native-elements';

const NavigateBack = () => {
  const navigation = useNavigation();
  const theme = useTheme<Theme>();
  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <Pressable onPress={navigateBack}>
      <Box bg="gray100" p="2" borderRadius="rounded-7xl">
        <Icon name="md-beer" type="ionicon" color="#887700" />
      </Box>
    </Pressable>
  );
};

export default NavigateBack;
