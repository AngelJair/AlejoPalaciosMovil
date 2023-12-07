import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import CobrosGeneral from './ConsultasCobros/CobrosGeneral';
import CobrosXCliente from './ConsultasCobros/CobrosXCliente';
import CobrosXPeriodo from './ConsultasCobros/CobrosXPeriodo';
import CobrosXTipoCobro from './ConsultasCobros/CobrosXTipoCobro';

const Tab = createBottomTabNavigator();

export default function Cobros() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Cobros General" component={CobrosGeneral} options={{
          tabBarLabel: 'General',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="border-all" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Cobros por Periodo" component={CobrosXPeriodo} options={{
          tabBarLabel: 'Periodo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Cobros por Cliente" component={CobrosXCliente} options={{
          tabBarLabel: 'Cliente',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Cobros por tipo de cobro" component={CobrosXTipoCobro} options={{
          tabBarLabel: 'Tipo de Cobro',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}