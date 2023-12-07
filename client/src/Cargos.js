import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import CargosGeneral from './ConsultasCargos/CargosGeneral';
import CargosXCliente from './ConsultasCargos/CargosXCliente';
import CargosXPeriodo from './ConsultasCargos/CargosXPeriodo';
import CargosXVenta from './ConsultasCargos/CargosXVenta';

const Tab = createBottomTabNavigator();

export default function PedidosProv() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Cargos General" component={CargosGeneral} options={{
          tabBarLabel: 'General',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="border-all" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Cargos por Cliente" component={CargosXCliente} options={{
          tabBarLabel: 'Cliente',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Cargos por periodo" component={CargosXPeriodo} options={{
          tabBarLabel: 'Periodo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}/>
        
    </Tab.Navigator>
  );
}