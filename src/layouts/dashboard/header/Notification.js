/* eslint-disable arrow-body-style */
import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrintIcon from "@mui/icons-material/Print";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Checkbox from "@mui/material/Checkbox";
import { apiget, deleteManyApi } from "../../../service/api";
import { fToNow } from "../../../utils/formatTime";
// eslint-disable-next-line import/no-unresolved
// import Link from "next/link";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Notification(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>

            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>

            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

Notification.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, message, createdOn) {
    return { id, message, createdOn };
}

const rows = [
    createData(
        "1",
        "Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...",
        "1 Jan 2022"
    ),
    createData(
        "2",
        "Last pic over my village  –  Yeah i'd like that! Do you remember the video som..",
        "/email/read-email",
        "2 Jan 2022"
    ),
    createData(
        "3",
        "Mochila Beta: Subscription Confirmed  –  You've been confirmed! Welcome to ",
        "3 Jan 2022"
    ),
    createData(
        "4",
        "You've been confirmed! Welcome to the ruling class of the inbox. For your ",
        "4 Jan 2022"
    ),
    createData(
        "5",
        "For your records, here is a copy of the information you submitted to us...",
        "5 Jan 2022"
    ),
    createData(
        "6",
        "Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...",
        "6 Jan 2022"
    ),
    createData(
        "7",
        "Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...",
        "7 Jan 2022"
    ),
    createData(
        "8",
        "For your records, here is a copy of the information you submitted to us...",
        "8 Jan 2022"
    ),
    createData(
        "9",
        "Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...",
        "9 Jan 2022"
    ),
    createData(
        "10",
        "Off on Thursday  –  Eff that place, you might as well stay here with us inst",
        "10 Jan 2022"
    ),
    createData(
        "11",
        "Hello  –  Trip home from 🎉 Colombo has been arranged, then Jenna will com...",
        "11 Jan 2022"
    ),
    createData(
        "12",
        "This Week's Top Stories  –  Our top pick for you on Medium this week The",
        "12 Jan 2022"
    ),
    createData(
        "13",
        "Weekend on Revibe  –  Today's Friday and we thought maybe you want so",
        "13 Jan 2022"
    ),
    createData(
        "14",
        "You can now use your storage in Google Drive  –  Hey Nicklas Sandell! Tha",
        "14 Jan 2022"
    ),
    createData(
        "15",
        "New Ticket Reply - eDemy - Michel Valenzuela",
        "15 Jan 2022"
    ),
    createData(
        "16",
        "New Ticket Reply - Abev - Manos Pappas",
        "16 Jan 2022"
    ),
    createData(
        "17",
        "New Ticket Reply - Lofi - Adarsh Raj",
        "11 Jan 2022"
    ),
];





export default function NotificationTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setRows] = React.useState([]);
    const [ids, setIds] = React.useState([]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Dropdown
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const rows = createData(
    //     notification.map((item) => {
    //         return (
    //             <>
    //                 {item. }
    //                 {item.data.message}
    //             </>
    //         )
    //     })
    // )

    const { id } = JSON.parse(localStorage.getItem('user'));

    const notificationApi = async () => {
        const result = await apiget(`/api/notification/?approvalBy=${id}`);
        if (result && result.status === 200) {
            const formattedData = result.data.map(item => {
                return {
                    id: item._id,
                    message: item.data.message,
                    createdOn: new Date(item.createdOn)
                };
            });
            formattedData.sort((a, b) => a.createdOn - b.createdOn);

            setRows(formattedData.map((item) => createData(item.id, item?.message, item?.createdOn)))
        }
    };

    const handleCheck = (row) => {
        setIds([...ids, row.id]);
    }

    const deleteMany = async () => {
        const data = {
            _id: ids
        }
        const result = await deleteManyApi('/api/notification/deleteMany', ids)
        console.log(result, "result")
        if (result && result.status === 200) {
            notificationApi()
        }
    }

    React.useEffect(() => {
        notificationApi();
    }, []);


    return (
        <>
            <Card
                sx={{
                    //   boxShadow: "none",
                    borderRadius: "10px",
                    p: "25px 25px 10px",
                    mb: "15px",
                    height: "700px",
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #EEF0F7",
                        paddingBottom: "10px",
                        mb: "20px",
                    }}
                    className="for-dark-bottom-border"
                >
                    <Typography
                        as="h2"
                        sx={{
                            //   fontSize: 16,
                            fontWeight: 500,
                        }}
                    >
                        Notification List
                    </Typography>

                    <Box>
                        {/* <Tooltip title="Print">
              <IconButton
                size="small"
                sx={{ background: "#F2F6F8" }}
                className='ml-5px'
              >
                <PrintIcon fontSize="small" />
              </IconButton>
            </Tooltip> */}

                        <Tooltip title="Delete">
                            <IconButton
                                size="small"
                                sx={{ background: "#F2F6F8" }}
                                className='ml-5px'
                            >
                                <DeleteIcon fontSize="small" onClick={() => rows.length > 0 && ids.length > 0 && deleteMany()} />
                            </IconButton>
                        </Tooltip>

                        {/* <Tooltip title="Report Spam">
              <IconButton
                size="small"
                sx={{ background: "#F2F6F8" }}
                className='ml-5px'
              >
                <ErrorOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip> */}

                        {/* <Tooltip title="More...">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                sx={{
                  background: "#F2F6F8",
                }}
                className='ml-5px'
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip> */}
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: "visible",
                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                mt: 1.5,
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                "&:before": {
                                    content: '""',
                                    display: "block",
                                    position: "absolute",
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: "background.paper",
                                    transform: "translateY(-50%) rotate(45deg)",
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem sx={{ fontSize: "14px" }}>Last 15 Days</MenuItem>
                        <MenuItem sx={{ fontSize: "14px" }}>Last Month</MenuItem>
                        <MenuItem sx={{ fontSize: "14px" }}>Last Year</MenuItem>
                    </Menu>
                </Box>

                <TableContainer
                    component={Paper}
                    sx={{
                        boxShadow: "none",
                    }}
                >
                    <Table
                        sx={{ minWidth: 500 }}
                        aria-label="custom pagination table"
                        className="dark-table"
                    >
                        <TableBody style={{ overflowY: "auto" }}>
                            {(rowsPerPage > 0
                                ? rows.slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                : rows
                            ).map((row) => (
                                <TableRow key={row.id} >
                                    <TableCell
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            padding: "10px",
                                        }}
                                    >
                                        <Checkbox {...label} size="small" onClick={() => handleCheck(row)} />
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            padding: "10px",
                                            textTransform: "capitalize"
                                        }}
                                    >
                                        {row.message}
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13px",
                                            padding: "10px",
                                        }}
                                    >
                                        {/* <Link href={row.readEmail} className="readEmail">
                      {row.text}
                    </Link> */}
                                    </TableCell>

                                    <TableCell
                                        align="right"
                                        style={{
                                            borderBottom: "1px solid #F7FAFF",
                                            fontSize: "13px",
                                            padding: "10px",
                                        }}
                                    >
                                        {fToNow(row?.createdOn)}
                                    </TableCell>
                                </TableRow>
                            ))}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell
                                        colSpan={3}
                                        style={{ borderBottom: "1px solid #F7FAFF" }}
                                    />
                                </TableRow>
                            )}
                        </TableBody>

                        <TableFooter>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={5}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        "aria-label": "rows per page",
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={Notification}
                                style={{ borderBottom: "none", position: "absolute", bottom: "0", right: "0" }}
                            />
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Card>
        </>
    );
}
