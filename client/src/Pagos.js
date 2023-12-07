import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import PagosGeneral from './ConsultasPagos/PagosGeneral';
import PagosXFormaPago from './ConsultasPagos/PagosXFomaPago';
import PagosXPeriodo from './ConsultasPagos/PagosXPeriodo';
import PagosXProveedor from './ConsultasPagos/PagosXProveedor';

const Tab = createBottomTabNavigator();

export default function Pagos() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Pagos General" component={PagosGeneral} options={{
          tabBarLabel: 'General',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="border-all" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Pagos por Periodo" component={PagosXPeriodo} options={{
          tabBarLabel: 'Periodo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Pagos por Proveedor" component={PagosXProveedor} options={{
          tabBarLabel: 'Proveedor',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Pagos por Forma de pago" component={PagosXFormaPago} options={{
          tabBarLabel: 'Forma de pago',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cash-multiple" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}