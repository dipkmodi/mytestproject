import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../AuthContext';

export default function LoginScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn, error: authError } = useAuth();

  const handleLogin = async () => {
    if (!userId || !password) {
      return;
    }
    setLoading(true);
    const success = await signIn(userId, password);
    setLoading(false);
    if (success) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {authError ? <Text style={styles.error}>{authError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
        autoCapitalize="none"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/auth/signup')} disabled={loading}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#007AFF',
    fontSize: 14,
  },
  error: {
    color: '#FF3B30',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 14,
  },
});
