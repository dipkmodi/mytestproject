import { useAuth } from '@/AuthContext';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>You are logged in as:</Text>
      <Text style={styles.userId}>{user?.userId}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  userId: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 30,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
