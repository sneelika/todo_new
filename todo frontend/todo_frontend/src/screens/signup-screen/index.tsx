import React from 'react';
import {Box, Text} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationType} from '../../navigation/types';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import Button from '../../components/shared/button';
import Input from '../../components/shared/input';
import {Pressable} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {IUser} from '../../types';
import {registerUser} from '../../services/api';

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignUp'>>();
  const navigateToSignInScreen = () => {
    navigation.navigate('SignIn');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IUser>({
    defaultValues: {
      // name: '',
      // email: '',
      // password: '',
    },
  });

  //Register User
  const onSubmit = async (data: IUser) => {
    try {
      console.log('Register Button Pressed');

      const {email, name, password} = data;
      console.log({email, name, password});
      await registerUser({
        email,
        name,
        password,
      });
      navigateToSignInScreen();
    } catch (error) {}
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" mt={'13'}>
        <Text variant="textXl" fontWeight="700">
          Welcome to TODO!
        </Text>
        <Box mb="6" />
        <Box mb="6" />

        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
              error={errors.name}
            />
          )}
          name="name"
        />
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              error={errors.email}
            />
          )}
          name="email"
        />
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: false,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              error={errors.name}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box height={44} />
        <Pressable onPress={navigateToSignInScreen}>
          <Text color="primary" textAlign="right">
            Already have an account? Log In
          </Text>
        </Pressable>
        <Box mb="5.5" />
        <Button label="Register" onPress={handleSubmit(onSubmit)} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;
