import { useEffect, useState } from 'react';
import { Card, Stack, Button, Container, Typography, Box } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, nbNO } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { FcFlowChart } from 'react-icons/fc';
import { useNavigate, Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Iconify from '../../components/iconify';
import { allusers, apidelete, apiget, deleteManyApi } from '../../service/api';
import TableStyle from '../../components/TableStyle';
import DeleteModel from '../../components/Deletemodle';
import AddSells from './AddSells';
import EditSells from './EditSells';

// ----------------------------------------------------------------------

function CustomToolbar({ selectedRowIds, fetchdata }) {
  const [isOpenDeleteModel, setIsOpenDeleteModel] = useState(false);

  const handleCloseDelete = () => {
    setIsOpenDeleteModel(false);
  };

  const handleOpenDelete = () => {
    setIsOpenDeleteModel(true);
  };

  const deleteManyOpd = async (data) => {
    const response = await deleteManyApi('/api/seles/deleteMany', data);
    if (response?.status === 200) {
      fetchdata();
      handleCloseDelete();
    }
  };

  return (
    <GridToolbarContainer>
      <GridToolbar />
      {selectedRowIds && selectedRowIds.length > 0 && (
        <Button
          variant="text"
          sx={{ textTransform: 'capitalize' }}
          startIcon={<DeleteOutline />}
          onClick={handleOpenDelete}
        >
          Delete
        </Button>
      )}
      <DeleteModel
        isOpenDeleteModel={isOpenDeleteModel}
        handleCloseDeleteModel={handleCloseDelete}
        deleteData={deleteManyOpd}
        id={selectedRowIds}
      />
    </GridToolbarContainer>
  );
}

export const Sells = () => {
  const [sellsList, setSellsList] = useState([]);
  const [allDocter, setDocter] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [tab, setTab] = useState(1);
  const [openEditModel, setEditModel] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [editProduct, setEditProduct] = useState('');
  const [data, setdata] = useState({});
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);
  const [openevent, setOpenevent] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);

  const handleSelectionChange = (selectionModel) => {
    setSelectedRowIds(selectionModel);
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const columns = [
    {
      field: 'productId',
      headerName: 'Product Name',
      flex: 2,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        return <Box >{params?.row?.productId?.name}</Box>;
      },
    },
    {
      field: 'price',
      headerName: 'Product Price',
      flex: 2,
      cellClassName: ' name-column--cell--capitalize',
      renderCell: (params) => {
        return (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <CurrencyRupeeIcon fontSize="9px" />
            {params?.row?.productId?.price}
          </Box>
        );
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 2,
      cellClassName: 'name-column--cell--capitalize',
    },

    {
      field: 'pts',
      headerName: 'PTS',
      flex: 2,
    },
    {
      field: 'ptr',
      headerName: 'PTR',
      flex: 2,
    },
    {
      field: 'ptd',
      headerName: 'PTD',
      flex: 2,
    },
    {
      field: 'totalAmount',
      headerName: 'Total Amount',
      flex: 2,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        return (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <CurrencyRupeeIcon fontSize="9px" />
            {params.value}
          </Box>
        );
      },
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   flex: 1,
    //   renderCell: (params) => {
    //     const handleClick = async (data) => {
    //       setdata(data);
    //       setEditModel(true);
    //     };
    //     return (
    //       <Button variant="outlined" style={{ color: '#000', border: 'none' }} onClick={() => handleClick(params)}>
    //         <EditIcon />
    //       </Button>
    //     );
    //   },
    // },
  ];

  const handleCloseAdd = () => {
    setOpenAdd(false);
    fetchdata();
  };
  const handleCloseEditModel = () => {
    fetchdata();
    setEditModel(false);
  };

  async function fetchdata() {
    const result = await apiget('/api/seles');
    if (result && result.status === 200) {
      setSellsList(result?.data);
    }
  }
  useEffect(() => {
    fetchdata();
  }, [openAdd, openEdit]);

  return (
    <>
      <AddSells open={openAdd} handleClose={handleCloseAdd} />
      <EditSells open={openEditModel} handleClose={handleCloseEditModel} productData={data} />
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Box>
            <Button
              variant="outlined"
              style={{ border: 'none', color: '#000', fontSize: '25px', padding: '0px' }}
              onClick={() => setTab(1)}
            >
              Sells
            </Button>
          </Box>
          <Box>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add
            </Button>
          </Box>
        </Stack>

        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '72vh', paddingTop: '15px' }}>
              <DataGrid
                rows={sellsList}
                columns={columns}
                components={{ Toolbar: () => CustomToolbar({ selectedRowIds, fetchdata }) }}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRowIds}
                getRowId={(row) => row._id}
              />
            </Card>
            {/* <div style={{ textAlign: 'right', padding: '10px', height: '100p' }}>Total:- 5000</div> */}
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};
