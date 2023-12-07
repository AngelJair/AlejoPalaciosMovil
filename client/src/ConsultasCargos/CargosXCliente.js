import * as React from 'react';
import { DataTable } from 'react-native-paper';
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

  const [selected, setSelected] = React.useState('');

  const [records, addRecords] = React.useState([]);
  const [Cliente, addCliente] = React.useState([]);

  const leeRegistros = async () => {
    const respuestaPOST = await fetch('http://'+ip+':3000/ConsultaCargosXCte', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Cte: selected})
      });
    const respuestaJSON = await respuestaPOST.json();
    addRecords(respuestaJSON);
  }


  React.useEffect(() => {
    leeRegistros();

    const SubirCtes = async () => {
      fetch('http://'+ip+':3000/SubirClientes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then( (response) => response.json())
        .then( (markers_response) => {
          addCliente(markers_response);
        } )
        .catch(error => {
          console.error(error);
      });
    }

    SubirCtes();
  }, []);


  return (

    <View>
      <SelectList
        boxStyles={{
          borderRadius: 20,
          margin: 5,
        }} //override default styles
        setSelected={(val) => setSelected(val)}
        data={Cliente.map((reg) =>(reg.Nombre))}
        save="value"
        placeholder='Cliente'
        searchPlaceholder='buscar'
        onSelect={leeRegistros}
      />

      <DataTable>

      <DataTable.Header style={styles.header} textStyle={styles.textheader}>
          <DataTable.Title textStyle={styles.textheader}>id Cargo</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Cliente</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Fecha</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Concepto</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Importe</DataTable.Title>
        </DataTable.Header>

        {records.map((reg) =>
            (
              <DataTable.Row key={reg.idCargo}>
                <DataTable.Cell>{reg.idCargo}</DataTable.Cell>
                <DataTable.Cell>{reg.Nombre}</DataTable.Cell>
                <DataTable.Cell>{reg.Fecha}</DataTable.Cell>
                <DataTable.Cell>{reg.Concepto}</DataTable.Cell>
                <DataTable.Cell>{reg.Importe}</DataTable.Cell>
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
});