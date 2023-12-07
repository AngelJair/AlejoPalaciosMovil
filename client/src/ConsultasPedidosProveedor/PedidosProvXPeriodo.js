import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, Platform, Image} from 'react-native';
import { DataTable } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ipAddress } from '../ip.js';
import { MaterialCommunityIcons, MaterialIcons, Fontisto, FontAwesome  } from '@expo/vector-icons';
var ip = ipAddress();

const optionsPerPage = [2, 3, 4];

export default function PedidosProvXPeriodo({ navigation }) {

  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [selected, setSelected] = useState('');
  const data = [
    { key: '1', value: 'Rep 1' },
    { key: '2', value: 'Rep 2' },
    { key: '3', value: 'Rep 3' },
    { key: '4', value: 'Rep 4' },
  ];


  const [records, addRecords] = React.useState([]);

  const leeRegistros = async () => {
    const respuestaPOST = await fetch('http://'+ip+':3000/ConsultaPedidosProvXPeriodo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            FI: dateI.toLocaleDateString("zh-Hans-CN"), 
            FF: dateF.toLocaleDateString("zh-Hans-CN")
          },
          )
      });
    const respuestaJSON = await respuestaPOST.json();
    addRecords(respuestaJSON);
  }


  React.useEffect(() => {
    leeRegistros();
  }, []);

  const [isPickerShowI, setIsPickerShowI] = useState(false);
  const [isPickerShowF, setIsPickerShowF] = useState(false);

  const [dateI, setDateI] = useState(new Date(Date.now()));
  const [dateF, setDateF] = useState(new Date(Date.now()));

  const showPickerI = () => {
    setIsPickerShowI(true);
  };

  const showPickerF = () => {
    setIsPickerShowF(true);
  };

  const onChangeI = (event, value) => {
    setDateI(value);
    if (Platform.OS === 'android') {
      setIsPickerShowI(false);
    }
  };

  const onChangeF = (event, value) => {
    setDateF(value);
    if (Platform.OS === 'android') {
      setIsPickerShowF(false);
    }
  };

    return (
      <View style={styles.container}>
        {/* Display the selected date */}
        {/* <View style={styles.pickedDateContainer}>
          <Text style={styles.pickedDate}>{dateI.toLocaleDateString("zh-Hans-CN")}</Text>
          <Text style={styles.pickedDate}>{dateF.toLocaleDateString("zh-Hans-CN")}</Text>
        </View> */}

        {/* The button that used to trigger the date picker */}
        <View style={styles.btnContainer}>
          {!isPickerShowI && (
            <View style={styles.btn} icon={<MaterialIcons name="date-range"/>}>
              <Button title="Fecha Inicio" color='#4147BF' onPress={showPickerI} />
            </View>
          )}

          {!isPickerShowF && (
            <View style={styles.btn}>
              <Button title="Fecha Fin" color='#4147BF' onPress={showPickerF} />
            </View>
          )}

            <View style={styles.btn}>
              <Button title="Consultar" color='#4147BF' onPress={leeRegistros} />
            </View>
        </View>
        

        <DataTable>

        <DataTable.Header style={styles.header} textStyle={styles.textheader}>
          <DataTable.Title textStyle={styles.textheader}>id Pedido</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Proveedoor</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Fecha</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Fecha Entrega</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Total</DataTable.Title>
        </DataTable.Header>

        {records.map((reg) =>
            (
              <DataTable.Row key={reg.idPedido}>
                <DataTable.Cell>{reg.idPedido}</DataTable.Cell>
                <DataTable.Cell>{reg.Nombre}</DataTable.Cell>
                <DataTable.Cell>{reg.Fecha}</DataTable.Cell>
                <DataTable.Cell>{reg.FechaEntrega}</DataTable.Cell>
                <DataTable.Cell>{reg.Total}</DataTable.Cell>
              </DataTable.Row>
            )
          )
        }


        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          showFastPaginationControls
          optionsLabel={'Rows per page'} />
        </DataTable>

        {/* The date picker */}
        {isPickerShowI && (
          <DateTimePicker
            value={dateI}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChangeI}
            style={styles.datePicker}
            positiveButton={{label: 'Aceptar', textColor: '#4147BF'}}
            negativeButton={{label: 'Cancelar', textColor: '#4147BF'}}
          />
        )}

        {isPickerShowF && (
          <DateTimePicker
            value={dateF}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChangeF}
            style={styles.datePicker}
            positiveButton={{label: 'Aceptar', textColor: '#4147BF'}}
            negativeButton={{label: 'Cancelar', textColor: '#4147BF'}}
          />
        )}
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      //display: 'flex',
      //flexDirection: 'column',
      //alignItems: 'center',
      //flex: 1,
      //justifyContent: 'center',
      //padding: 30,
    },
    pickedDateContainer: {
      padding: 20,
      backgroundColor: '#eee',
      borderRadius: 10,
    },
    pickedDate: {
      fontSize: 18,
      color: 'black',
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    // This only works on iOS
    datePicker: {
      //width: 320,
      //height: 260,
      width: 100,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    btn: {
      padding: 5,
    },
    image: {
      //marginBottom: 40,
      width: 50,
      height: 50,
    },
  });