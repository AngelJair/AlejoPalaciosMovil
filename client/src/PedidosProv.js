import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import PedidosProvGeneral from './ConsultasPedidosProveedor/PedidosProvGeneral';
import PedidosProvXEstado from './ConsultasPedidosProveedor/PedidosProvXEstado';
import PedidosProvXPeriodo from './ConsultasPedidosProveedor/PedidosProvXPeriodo';
import PedidosProvXProveedor from './ConsultasPedidosProveedor/PedidosProvXProveedor';


const Tab = createBottomTabNavigator();

export default function PedidosProv() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Pedidos Proveedor General" component={PedidosProvGeneral} options={{
          tabBarLabel: 'General',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="border-all" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Pedidos por Proveedor" component={PedidosProvXProveedor} options={{
          tabBarLabel: 'Proveedor',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Pedidos por periodo" component={PedidosProvXPeriodo} options={{
          tabBarLabel: 'Periodo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Pedidos por estado" component={PedidosProvXEstado} options={{
          tabBarLabel: 'Estado',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="check-box" size={size} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
}