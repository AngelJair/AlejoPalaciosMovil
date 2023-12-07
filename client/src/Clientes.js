import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto  } from '@expo/vector-icons';
import ConsultaTipoCliente from './ConsultasClientes/ConsultaTipoCliente';
import ConsultaSinSaldo from './ConsultasClientes/ConsultaSinSaldo';
import ConsultaConSaldo from './ConsultasClientes/ConsultaConSaldo';
import ConsultaGeneral from './ConsultasClientes/ConsultaGeneral';

const Tab = createBottomTabNavigator();

export default function Clientes() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Consulta General" component={ConsultaGeneral} options={{
          tabBarLabel: 'General',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="border-all" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Clientes Con Saldo" component={ConsultaConSaldo} options={{
          tabBarLabel: 'Con Saldo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-check" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Clientes Sin Saldo" component={ConsultaSinSaldo} options={{
          tabBarLabel: 'Sin Saldo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-remove" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Consulta por Tipo de Cliente" component={ConsultaTipoCliente} options={{
          tabBarLabel: 'Tipo de Cliente',
          tabBarIcon: ({ color, size }) => (
            <Fontisto  name="persons" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}