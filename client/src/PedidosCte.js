import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, Fontisto } from '@expo/vector-icons';
import PedidoCteEstado from './ConsultasPedidosCliente/PedidosCteEstado';
import PedidosCteGeneral from './ConsultasPedidosCliente/PedidosCteGeneral';
import PedidosCteXPeriodo from './ConsultasPedidosCliente/PedidosCtePeriodo';
import PedidosCteXCliente from './ConsultasPedidosCliente/PedidosCteXCliente';


const Tab = createBottomTabNavigator();

export default function PedidosCte() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#1F26A5',
      }}
    >
      <Tab.Screen name="Pedidos Cliente General" component={PedidosCteGeneral} options={{
          tabBarLabel: 'General',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="border-all" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Pedidos por Cliente" component={PedidosCteXCliente} options={{
          tabBarLabel: 'Cliente',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Pedidos por periodo" component={PedidosCteXPeriodo} options={{
          tabBarLabel: 'Periodo',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="date-range" color={color} size={size} />
          ),
        }}/>
        <Tab.Screen name="Pedidos por estado" component={PedidoCteEstado} options={{
          tabBarLabel: 'Estado',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="check-box" size={size} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
}