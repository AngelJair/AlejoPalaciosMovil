import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto, FontAwesome  } from '@expo/vector-icons';
import VentasXCliente from './ConsultasVentas/VentasXCliente';
import VentasXSaldo from './ConsultasVentas/VentasXSaldo';
import VentasXUsuario from './ConsultasVentas/VentasXUsuario';
import VentasVencidas from './ConsultasVentas/VentasVencidas';
import VentasXPeriodo from './ConsultasVentas/VentasXPeriodo';

const Tab = createBottomTabNavigator();

export default function Ventas() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Ventas por periodo" component={VentasXPeriodo} options={{
          tabBarLabel: 'Periodo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Ventas por Cliente" component={VentasXCliente} options={{
          tabBarLabel: 'Cliente',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Ventas por Usuario" component={VentasXUsuario} options={{
          tabBarLabel: 'Usuario',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome  name="user" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Ventas por Saldo" component={VentasXSaldo} options={{
          tabBarLabel: 'Saldo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-check" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Ventas Vencidas" component={VentasVencidas} options={{
          tabBarLabel: 'Vencidas',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome  name="calendar-times-o" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}