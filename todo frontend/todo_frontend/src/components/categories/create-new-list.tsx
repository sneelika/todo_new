// import {CategoriesNavigationType} from '../../navigation/types';
import {Box, Text, Theme} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '@shopify/restyle';
import React from 'react';
import {Pressable} from 'react-native';
import {CategoriesNavigationType} from '../../navigation/types';

const CreateNewList = () => {
  const navigation = useNavigation<CategoriesNavigationType>();

  const navigateToCreateCategory = () => {
    navigation.navigate('CreateCategory', {});
  };

  return (
    <Pressable onPress={navigateToCreateCategory}>
      <Box
        p="4"
        bg="lightGray"
        borderRadius="rounded-5xl"
        flexDirection="row"
        alignItems="center">
        <Text variant="textXl" fontWeight="600" color="gray650" ml="3">
          Create new list
        </Text>
      </Box>
    </Pressable>
  );
};

export default CreateNewList;
