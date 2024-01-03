/* eslint-disable arrow-body-style */
import { Button, Menu, MenuItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CustomMenu = ({ open, handleClick, anchorEl, handleClose, id, params, handleOpenEdit, handleOpenDeleteModel, type }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userRole = user?.role.toLowerCase();
    return (
        <div>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={(e) => handleClick(params?.row, e)}
            >
                <MoreVertIcon />
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    type === "edit" ? "" :
                        <MenuItem onClick={() => {
                            handleOpenEdit();
                            handleClose();
                        }}>
                            <EditIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Edit</span>
                        </MenuItem>
                }
                {
                    type === "delete" ? "" :
                        <MenuItem onClick={() => {
                            handleOpenDeleteModel();
                            handleClose();
                        }}>
                            <DeleteIcon fontSize="10" /> <span style={{ marginLeft: '20px' }}>Delete</span>
                        </MenuItem>
                }
            </Menu>
        </div>
    )
}

export default CustomMenu