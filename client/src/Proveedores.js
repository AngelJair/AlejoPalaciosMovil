import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import ConsultaGeneral from './ConsultasProveedores/ConsultaGeneralProv';
import ProveedoresConSaldo from './ConsultasProveedores/ProveedoresConSaldo';
import ProveedoresSinSaldo from './ConsultasProveedores/ProveedoresSinSaldo';
import ProveedoresXRepresentante from './ConsultasProveedores/ProveedoresXRepresentante';

const Tab = createBottomTabNavigator();

export default function Proveedores() {
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
      <Tab.Screen name="Proveedores Con Saldo" component={ProveedoresConSaldo} options={{
          tabBarLabel: 'Con Saldo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-check" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Proveedores Sin Saldo" component={ProveedoresSinSaldo} options={{
          tabBarLabel: 'Sin Saldo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="credit-card-remove" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Consulta por Representante" component={ProveedoresXRepresentante} options={{
          tabBarLabel: 'por Representante',
          tabBarIcon: ({ color, size }) => (
            <Fontisto  name="persons" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}