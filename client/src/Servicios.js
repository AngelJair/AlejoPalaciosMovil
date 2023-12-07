import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import ServiciosXTipoServicio from './ConsultasServicios/ServiciosXTipoServicio';

const Tab = createBottomTabNavigator();

export default function Servicios() {
  return (
    <Tab.Navigator screenOptions={{
        tabBarActiveTintColor: '#4147BF',
      }}
    >
      <Tab.Screen name="Consulta por tipo de servicio" component={ServiciosXTipoServicio} options={{
          tabBarLabel: 'Tipo de servicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="miscellaneous-services" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}