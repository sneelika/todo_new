import React from 'react';
import {Box, Text} from '../../utils/theme';
import {useNavigation} from '@react-navigation/native';
import {AuthScreenNavigationType} from '../../navigation/types';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import Button from '../../components/shared/button';
import Input from '../../components/shared/input';
import {Pressable} from 'react-native';
import {useDispatch} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {loginUser} from '../../services/api';
import {IUser} from '../../types';
import {logiin} from '../../store/user/userActions';

const SignInScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<'SignIn'>>();
  const dispatch = useDispatch();
  const navigateToSignInScreen = () => {
    navigation.navigate('SignUp');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<Omit<IUser, 'name'>>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: Omit<IUser, 'name'>) => {
    try {
      const {email, password} = data;
      const _user = await loginUser({
        email: email.toLowerCase(),
        password: password,
      });

      console.log(_user);
      dispatch(logiin(_user.name));
    } catch (error) {
      console.log('error in loginUser', error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="5.5" justifyContent="center">
        <Text variant="textXl" fontWeight="700">
          Welcome Back
        </Text>
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
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
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              error={errors.password}
              secureTextEntry
            />
          )}
          name="password"
        />
        <Box mt="5.5" />
        <Pressable onPress={navigateToSignInScreen}>
          <Text color="primary" textAlign="right">
            Register?
          </Text>
        </Pressable>
        <Box mb="5.5" />

        <Button label="Login" onPress={handleSubmit(onSubmit)} uppercase />
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;
