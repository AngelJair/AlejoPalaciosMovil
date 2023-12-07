import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ConsultaASurtir from './ConsultasProductos/ConsultaASurtir';
import ConsultaXCategoria from './ConsultasProductos/ConsultaXCategoria';
import ConsultaListaPrecios from './ConsultasProductos/ConsultaListaPrecios';
import ConsultaXEsistencias from './ConsultasProductos/ConsultaXEsistencias';

const Tab = createBottomTabNavigator();

export default function Productos() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#4147BF',
      }}
    >
      <Tab.Screen name="Consulta por Categoría" component={ConsultaXCategoria} options={{
          tabBarLabel: 'Categoria',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Productos A surtir" component={ConsultaASurtir} options={{
          tabBarLabel: 'A surtir',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Consulta por existencias" component={ConsultaXEsistencias} options={{
          tabBarLabel: 'Existencias',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="stocking" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Lista de Precios" component={ConsultaListaPrecios} options={{
          tabBarLabel: 'Lista de Precios',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="attach-money" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}