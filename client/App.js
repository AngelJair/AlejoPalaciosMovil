import 'react-native-gesture-handler';
import * as React from 'react';
import { Button, View, Image, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MenuPrincipal from './src/MenuPrincipal';
import Productos from './src/Productos';
import Servicios from './src/Servicios';
import Clientes from './src/Clientes';
import Proveedores from './src/Proveedores';
import Ventas from './src/Ventas';
import Compras from './src/Compras';
import Pagos from './src/Pagos';
import Cobros from './src/Cobros';
import PedidosCte from './src/PedidosCte';
import PedidosProv from './src/PedidosProv';
import Cargos from './src/Cargos';


MenuIco = require('./assets/Inicio.png');
ProductosIco = require('./assets/Inventario.png');
ServiciosIco = require('./assets/Servicios.png');
ClienteIco = require('./assets/Clientes.png');
ProveedoresIco = require('./assets/Proveedores.png');
VentasIco = require('./assets/Ventas.png');
ComprasIco = require('./assets/Compras.png');
PagosIco = require('./assets/Pagos.png');
CobrosIco = require('./assets/Cobros.png');
PedidosCteIco = require('./assets/Pedidos.png');
PedidosProvIco = require('./assets/Pedidos.png');
CargosIco = require('./assets/Interes.png');

const Separator = () => {
  return <View style={styles.separator} />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="MenuPrincipal"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#1F26A5',
          },
          drawerActiveBackgroundColor: '#4147BF',
          drawerLabelStyle:{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'normal'
          },
          headerStyle: {
            backgroundColor: '#1F26A5',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Drawer.Screen name="Inicio" component={MenuPrincipal} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={MenuIco}/>
          ),
        }}/>
        <Drawer.Screen name="Productos" component={Productos} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={ProductosIco}/>
          ),
        }}/>
        <Drawer.Screen name="Servicios" component={Servicios} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={ServiciosIco}/>
          ),
        }}/>
        <Drawer.Screen name="Clientes" component={Clientes} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={ClienteIco}/>
          ),
        }}/>
        <Drawer.Screen name="Proveedores" component={Proveedores} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={ProveedoresIco}/>
          ),
        }}/>
        <Drawer.Screen name="Ventas" component={Ventas} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={VentasIco}/>
          ),
        }}/>
        <Drawer.Screen name="Compras" component={Compras} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={ComprasIco}/>
          ),
        }}/>
        <Drawer.Screen name="Pagos" component={Pagos} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={PagosIco}/>
          ),
        }}/>
        <Drawer.Screen name="Cobros" component={Cobros} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={CobrosIco}/>
          ),
        }}/>
        <Drawer.Screen name="Pedidos Cliente" component={PedidosCte} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={PedidosCteIco}/>
          ),
        }}/>
        <Drawer.Screen name="Pedidos Proveedor" component={PedidosProv} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={PedidosProvIco}/>
          ),
        }}/>
        <Drawer.Screen name="Cargos" component={Cargos} options={{
          drawerIcon: ({ color, size }) => (
            <Image style={styles.imageIco} source={CargosIco}/>
          ),
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
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