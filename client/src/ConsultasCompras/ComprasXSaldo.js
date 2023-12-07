import * as React from 'react';
import { DataTable, RadioButton, Text } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View } from 'react-native';
import { ipAddress } from '../ip.js';

var ip = ipAddress();

const optionsPerPage = [2, 3, 4];

export default function CargosXCliente({ navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);


  const [records, addRecords] = React.useState([]);

  //let records = [];
    /*
    const loadRecords = () => {
        console.log(selected);
        fetch('http://localhost:3000/search', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({TipoEnvaseVacio: selected})
        }).then( (response) => { response.json(); } )
          .then( (data) => {
            addRecord(... records, data);
            //records = JSON.parse(data);
          } )
          .catch(error => {
            console.error(error);
        }); 
    }
    */

  const leeRegistros = async (Condicion) => {
    const condi = Condicion;
    const respuestaPOST = await fetch('http://'+ip+':3000/ConsultaComprasXSaldo', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Condicion: condi})
      });
    const respuestaJSON = await respuestaPOST.json();
    addRecords(respuestaJSON);
  }


  React.useEffect(() => {
    leeRegistros('Con Saldo');
  }, []);

  const ValorCambiadoConSaldo = (() => {
    setChecked('Con Saldo');
    leeRegistros('Con Saldo');
  });

  const ValorCambiadoSinSaldo = (() => {
    setChecked('Sin Saldo');
    leeRegistros('Sin Saldo');
  });

  const ValorCambiadoTodas = (() => {
    setChecked('Todas');
    leeRegistros('Todas');
  });

  const [checked, setChecked] = React.useState('Con Saldo');

  return (

    <View>
      <View>
        <Text>Con Saldo</Text>
        <RadioButton
          value="Con Saldo"
          status={ checked === 'Con Saldo' ? 'checked' : 'unchecked' }
          onPress={ValorCambiadoConSaldo}
          color='#4147BF'
        />
      </View>
      <View>
        <Text>Sin Saldo</Text>
        <RadioButton
          value="Sin Saldo"
          status={ checked === 'Sin Saldo' ? 'checked' : 'unchecked' }
          onPress={ValorCambiadoSinSaldo}
          color='#4147BF'
        />
      </View>
      <View>
        <Text>Todas</Text>
        <RadioButton
          value="Todas"
          status={ checked === 'Todas' ? 'checked' : 'unchecked' }
          onPress={ValorCambiadoTodas}
          color='#4147BF'
        />
      </View>

      <DataTable>

      <DataTable.Header style={styles.header} textStyle={styles.textheader}>
          <DataTable.Title textStyle={styles.textheader}>id Compra</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} >Nombre</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} >Fecha</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} numeric >Total</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} numeric >Saldo</DataTable.Title>
        </DataTable.Header>

        {records.map((reg) =>
            (
              <DataTable.Row key={reg.idCompra}>
                <DataTable.Cell>{reg.idCompra}</DataTable.Cell>
                <DataTable.Cell>{reg.Nombre}</DataTable.Cell>
                <DataTable.Cell >{reg.Fecha}</DataTable.Cell>
                <DataTable.Cell numeric>{reg.Total}</DataTable.Cell>
                <DataTable.Cell numeric>{reg.Saldo}</DataTable.Cell>
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
    </View>


  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4147BF',
    margin: 5,
    borderRadius: 10,

  },
  textheader: {
    color: '#fff',
    fontSize: 15
  },
  RadioBtnContainer: {
      flexDirection: 'row',
    },
});