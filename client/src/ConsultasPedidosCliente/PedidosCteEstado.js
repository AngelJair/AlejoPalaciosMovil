import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View } from 'react-native';
import { ipAddress } from '../ip.js';

var ip = ipAddress();

const optionsPerPage = [2, 3, 4];

export default function PedidosCteEstado({ navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [selected, setSelected] = React.useState('');
  const data = [
    { key: '1', value: 'Activo' },
    { key: '2', value: 'Cancelado' },
  ];


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

  const leeRegistros = async () => {
    const respuestaPOST = await fetch('http://'+ip+':3000/ConsultaPedidosCteXEstado', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Estado: selected})
      });
    const respuestaJSON = await respuestaPOST.json();
    addRecords(respuestaJSON);
  }


  React.useEffect(() => {
    leeRegistros();
  }, []);


  return (

    <View>
      <SelectList
        boxStyles={{
          borderRadius: 20,
          margin: 5,
        }} //override default styles
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        placeholder='Estado'
        searchPlaceholder='buscar'
        onSelect={leeRegistros}
      />

      <DataTable>

      <DataTable.Header style={styles.header} textStyle={styles.textheader}>
          <DataTable.Title textStyle={styles.textheader}>id Pedido</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Cliente</DataTable.Title>
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