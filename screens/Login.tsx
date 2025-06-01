import React, { useState, useCallback } from 'react';
import { Alert, Switch, Pressable, StyleSheet, Text, View, Image, Dimensions, ActivityIndicator, 
    ScrollView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import NavButton from '../components/NavButton';

const logo = require('../assets/thruplr_no_bg.png');
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STORAGE_KEY = 'userLogin';
const API_ENDPOINT = 'http://192.168.1.153:1323/login';

interface LoginFormData {
  username: string;
  password: string;
}

interface ApiResponse {
  value: string;
  [key: string]: any;
}

function Login(): JSX.Element {
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  React.useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage('');
  }, [errorMessage]);

  const handleRememberMe = useCallback(async (value: boolean) => {
    setRememberMe(value);
    if (value && formData.username && formData.password) {
      try { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); } 
      catch (error) { console.error('Failed to save login data:', error); }
    } else if (!value) {
      try { await AsyncStorage.removeItem(STORAGE_KEY); } 
      catch (error) { console.error('Failed to remove login data:', error); }
    }
  }, [formData]);

  const validateForm = (): boolean => {
    const { username, password } = formData;
    if (!username.trim()) { setErrorMessage('Please enter your username'); return false; }
    if (!password.trim()) { setErrorMessage('Please enter your password'); return false; }
    return true;
  };

  const performLogin = async (): Promise<void> => {
    if (!validateForm()) return;
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      const apiResponse: ApiResponse = JSON.parse(responseText);

      if (response.status === 200 && apiResponse.value !== 'failure') {
        if (rememberMe) { await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(formData)); }
        dispatch(setUser(apiResponse));
        navigation.navigate('Tab Display');
      } else {
        setErrorMessage('Invalid credentials. Please check your username and password.');
        dispatch(setUser({}));
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Unable to connect. Please check your internet connection and try again.');
      dispatch(setUser({}));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = useCallback(() => {
    Alert.alert('Reset Password', 'Password reset functionality will be available soon. Please contact support if you need immediate assistance.', [{ text: 'OK' }]);
  }, []);

  const navigateToRegistration = useCallback(() => { navigation.navigate('Registration'); }, [navigation]);

  React.useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData: LoginFormData = JSON.parse(savedData);
          setFormData(parsedData);
          setRememberMe(true);
        }
      } catch (error) { console.error('Failed to load saved credentials:', error); }
    };
    loadSavedCredentials();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </Animated.View>

        <Animated.View style={[styles.formCard, { opacity: fadeAnim }]}>
          {errorMessage ? (
            <Animated.View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </Animated.View>
          ) : null}

          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput style={styles.input} value={formData.username} 
                onChangeText={(value) => handleInputChange('username', value)} autoCorrect={false} autoCapitalize="none" editable={!isLoading} mode="outlined" outlineColor="#E0E7FF" activeOutlineColor="#55CDFC" theme={{ colors: { background: '#FFFFFF' } }} />
            </View>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput style={styles.input} value={formData.password} 
                onChangeText={(value) => handleInputChange('password', value)} secureTextEntry autoCorrect={false} autoCapitalize="none" editable={!isLoading} mode="outlined" outlineColor="#E0E7FF" activeOutlineColor="#55CDFC" theme={{ colors: { background: '#FFFFFF' } }} />
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <View style={styles.rememberMeContainer}>
              <Switch value={rememberMe} onValueChange={handleRememberMe} 
                trackColor={{ true: '#F7A8B8', false: '#E5E7EB' }} thumbColor={rememberMe ? '#FFFFFF' : '#F9FAFB'} 
                disabled={isLoading} />
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>
            
            <Pressable onPress={handleForgotPassword} disabled={isLoading}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Pressable>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.loginButton, isLoading && styles.disabledButton]} 
                onPress={isLoading ? () => {} : performLogin}>
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
                  <Text style={styles.buttonText}>Signing in...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </Pressable>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable style={[styles.signUpButton, isLoading && styles.disabledButton]} 
            onPress={isLoading ? () => {} : navigateToRegistration}>
            <Text style={styles.signUpButtonText}>
              Don't have an account? <Text style={styles.signUpLink}>Sign up</Text>
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 40 },
  logo: { height: 120, width: 240, marginBottom: 24 },
  welcomeText: { fontSize: 28, fontWeight: '700', color: '#2D3748', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#718096', textAlign: 'center' },
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 32, shadowColor: '#55CDFC', 
    shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 8, borderWidth: 1, 
    borderColor: '#F0F8FF' },
  errorContainer: { backgroundColor: '#FFF5F5', borderLeftWidth: 4, borderLeftColor: '#F56565', borderRadius: 8, 
    padding: 16, marginBottom: 24 },
  errorText: { color: '#E53E3E', fontSize: 14, lineHeight: 20 },
  inputContainer: { marginBottom: 24 },
  inputWrapper: { marginBottom: 20 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#4A5568', marginBottom: 8 },
  input: { backgroundColor: '#FFFFFF', fontSize: 16 },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  rememberMeContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rememberMeText: { fontSize: 14, color: '#718096', fontWeight: '500' },
  forgotPasswordText: { fontSize: 14, color: '#55CDFC', fontWeight: '500' },
  buttonContainer: { marginBottom: 24 },
  loginButton: { backgroundColor: '#55CDFC', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 24, 
    alignItems: 'center', justifyContent: 'center', shadowColor: '#55CDFC', shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
  disabledButton: { opacity: 0.6 },
  loadingContainer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { marginHorizontal: 16, fontSize: 14, color: '#A0AEC0', fontWeight: '500' },
  signUpButton: { alignItems: 'center', justifyContent: 'center', paddingVertical: 12 },
  signUpButtonText: { fontSize: 14, color: '#718096' },
  signUpLink: { color: '#F7A8B8', fontWeight: '600' },
});

export default Login;