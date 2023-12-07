import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View } from 'react-native';
import { ipAddress } from '../ip.js';

var ip = ipAddress();

const optionsPerPage = [2, 3, 4];

export default function ProveedoresSinSaldo({ navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [selected, setSelected] = React.useState('');
  const data = [
    { key: '1', value: 'Recargas' },
    { key: '2', value: 'Transferencias' },
    { key: '3', value: 'Pago Luz' },
    { key: '4', value: 'Pago TV' },
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

  /*const leeRegistros = async () => {
    console.log("Consulta Categoria")
    console.log(ip);
    const respuestaPOST = await fetch('http://'+ip+':3000/ConsultaGClientes', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({TipoServicio: selected})
      });
    const respuestaJSON = await respuestaPOST.json();
    addRecords(respuestaJSON);
  }


  React.useEffect(() => {
    leeRegistros();
  }, []);*/

  React.useEffect( () => {
    const leeRegistros = async () => {
      fetch('http://'+ip+':3000/ConsultaProvSinSaldo', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then( (response) => response.json())
        .then( (markers_response) => {
          addRecords(... records, markers_response);
        } )
        .catch(error => {
          console.error(error);
      });
    }
    
    leeRegistros();
  }
  , []);


  return (

    <View>


      <DataTable>

        <DataTable.Header style={styles.header} textStyle={styles.textheader}>
          <DataTable.Title textStyle={styles.textheader}>id Proveedor</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} >Nombre</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} numeric >Saldo</DataTable.Title>
        </DataTable.Header>

        {records.map((reg) =>
            (
              <DataTable.Row key={reg.idProveedor}>
                <DataTable.Cell>{reg.idProveedor}</DataTable.Cell>
                <DataTable.Cell >{reg.Nombre}</DataTable.Cell>
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
});