import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View } from 'react-native';
import { ipAddress } from '../ip.js';

var ip = ipAddress();

const optionsPerPage = [2, 3, 4];

export default function ConsultaASurtir({ navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [selected, setSelected] = React.useState('');

  const [Categorias, addCategorias] = React.useState([]);


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
    const respuestaPOST = await fetch('http://'+ip+':3000/ConsultaProductosASurtir', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Categoria: selected})
      });
    const respuestaJSON = await respuestaPOST.json();
    addRecords(respuestaJSON);
  }


  React.useEffect(() => {
    leeRegistros();

    const SubirCategorias = async () => {
      fetch('http://'+ip+':3000/SubirCategorias', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then( (response) => response.json())
        .then( (markers_response) => {
          addCategorias(markers_response);
        } )
        .catch(error => {
          console.error(error);
      });
    }

    SubirCategorias();
  }, []);


  return (

    <View>
      <SelectList
        boxStyles={{
          borderRadius: 20,
          margin: 5,
        }} //override default styles
        setSelected={(val) => setSelected(val)}
        data={Categorias.map((reg) =>(reg.Concepto))}
        save="value"
        placeholder='Categoría'
        searchPlaceholder='buscar'
        onSelect={leeRegistros}
      />

      <DataTable>

        <DataTable.Header style={styles.header} textStyle={styles.textheader}>
          <DataTable.Title textStyle={styles.textheader}>Id Producto</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Nombre</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader}>Existencia</DataTable.Title>
        </DataTable.Header>

        {records.map((reg) =>
            (
              <DataTable.Row key={reg.idProducto}>
                <DataTable.Cell>{reg.idProducto}</DataTable.Cell>
                <DataTable.Cell>{reg.Producto}</DataTable.Cell>
                <DataTable.Cell>{reg.Existencia}</DataTable.Cell>
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