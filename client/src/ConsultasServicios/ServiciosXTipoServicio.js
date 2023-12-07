import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { StyleSheet, View } from 'react-native';
import { ipAddress } from '../ip.js';

var ip = ipAddress();

const optionsPerPage = [2, 3, 4];

export default function ServiciosXTipoServicio({ navigation }) {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [selected, setSelected] = React.useState('');
  const [Servicios, addServicio] = React.useState([]);

  const [records, addRecords] = React.useState([]);

  const leeRegistros = async () => {
    const respuestaPOST = await fetch('http://'+ip+':3000/ConsultaServiciosXTipo', {
        method: 'POST',
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

    const SubirServicios = async () => {
      fetch('http://'+ip+':3000/SubirServicios', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then( (response) => response.json())
        .then( (markers_response) => {
          addServicio(markers_response);
        } )
        .catch(error => {
          console.error(error);
      });
    }

    SubirServicios();
  }, []);


  return (

    <View>
      <SelectList
        boxStyles={{
          borderRadius: 20,
          margin: 5,
        }} //override default styles
        setSelected={(val) => setSelected(val)}
        data={Servicios.map((reg) =>(reg.Concepto))}
        save="value"
        placeholder='Tipo Servicio'
        searchPlaceholder='buscar'
        onSelect={leeRegistros}
      />

      <DataTable>

        <DataTable.Header style={styles.header} textStyle={styles.textheader}>
          <DataTable.Title textStyle={styles.textheader}>id Servicio</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} >Descripción</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} >SubServicio</DataTable.Title>
          <DataTable.Title textStyle={styles.textheader} numeric>Existencia</DataTable.Title>
        </DataTable.Header>

        {records.map((reg) =>
            (
              <DataTable.Row key={reg.idServicio}>
                <DataTable.Cell>{reg.idServicio}</DataTable.Cell>
                <DataTable.Cell >{reg.Descripcion}</DataTable.Cell>
                <DataTable.Cell >{reg.SubServicio}</DataTable.Cell>
                <DataTable.Cell numeric>{reg.Existencia}</DataTable.Cell>
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