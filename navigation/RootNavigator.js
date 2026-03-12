import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../AuthContext';
import AppNavigator from './AppStack';
import AuthNavigator from './AuthStack';

const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
