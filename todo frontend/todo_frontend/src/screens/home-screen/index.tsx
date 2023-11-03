import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../components/shared/loader';
import SafeAreaWrapper from '../../components/shared/safe-area-wrapper';
import Task from '../../components/tasks/task';
import TaskActions from '../../components/tasks/task-actions';
import axiosInstance, {fetcher} from '../../services/config';
import {ITask} from '../../types';
import {getGreeting} from '../../utils/helpers';
import {AnimatedText, Box, Text} from '../../utils/theme';
import {format} from 'date-fns';
import React, {useEffect} from 'react';
import {FlatList, Pressable} from 'react-native';
import {ZoomInEasyDown} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome5';
import useSWR from 'swr';
import {logout} from '../../store/user/userActions';
import {logoutUser} from '../../services/api';

const today = new Date();

const greeting = getGreeting({hour: new Date().getHours()});

const HomeScreen = () => {
  const user = useSelector((state: any) => state.user.user);

  console.log('User from store', user);
  const {
    data: tasks,
    isLoading,
    mutate: mutateTasks,
  } = useSWR<ITask[]>('tasks/', fetcher);

  if (isLoading || !tasks) {
    return <Loader />;
  }

  const dispatch = useDispatch();
  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
  };

  return (
    <SafeAreaWrapper>
      <Box pt="1" />
      <Box flex={1} mx="4">
        <Box
          flexDirection="row"
          justifyContent="space-between" // Pushes the "Logout" text to the end
        >
          <AnimatedText
            variant="textXl"
            fontWeight="500"
            entering={ZoomInEasyDown.delay(500).duration(700)}>
            Good {greeting} {user && user}
          </AnimatedText>
          <Box flexDirection="row">
            <Icon name="circle" size={16} />
            <Pressable onPress={handleLogout}>
              <Text>Logout</Text>
            </Pressable>
          </Box>
        </Box>

        <Text variant="textXl" fontWeight="500">
          It’s {format(today, 'eeee, LLL dd')} - {tasks.length} Tasks
        </Text>
        <Box height={26} />
        <TaskActions categoryId="" />
        <Box height={26} />
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <Task task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
