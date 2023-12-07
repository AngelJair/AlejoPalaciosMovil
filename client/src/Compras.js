import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto, FontAwesome } from '@expo/vector-icons';
import ComprasVencidas from './ConsultasCompras/ComprasVencidas';
import ComprasXPeriodo from './ConsultasCompras/ComprasXPeriodo';
import ComprasXProveedor from './ConsultasCompras/ComprasXProveedor';
import ComprasXSaldo from './ConsultasCompras/ComprasXSaldo';

const Tab = createBottomTabNavigator();

export default function Compras() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Compras por periodo" component={ComprasXPeriodo} options={{
          tabBarLabel: 'Periodo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Compras por Proveedor" component={ComprasXProveedor} options={{
          tabBarLabel: 'Proveedor',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Compras por Saldo" component={ComprasXSaldo} options={{
          tabBarLabel: 'Saldo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-check" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Compras Vencidas" component={ComprasVencidas} options={{
          tabBarLabel: 'Vencidas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome  name="calendar-times-o" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}