import { useAppData } from '@/contexts/AppDataContext';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {
  const { setLogged } = useAppData()
  
  const handleLogout = async () => {
    await localStorage.clear()
    setLogged(false)
  }
  return (
    <View style={styles.container}>
      <Text>Olá Mundo!</Text>
      <Pressable onPress={handleLogout}>
        <Text>Sair</Text>
      </Pressable>        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }

});
