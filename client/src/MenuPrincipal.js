import { View, Image, StyleSheet } from "react-native";
Logo = require ('../assets/GrupoAlejo.jpg');

export default function MenuPrincipal({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        {/* <Button
          onPress={() => navigation.navigate('Ventas')}
          title="Ir a ventas"
        />
        <Separator/> */}
        <Image style={styles.image} source={Logo}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      marginBottom: 40,
      width: 375,
      height: 375,
    },
    imageIco: {
      width: 32,
      height: 32,
    },
    separator: {
      marginVertical: 10,
    },
  });