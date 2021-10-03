import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setEditorTheme } from '../features/settings/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;

export default function LongMenu({ items }) {
  const dispatch = useDispatch();
  const { editorTheme } = useSelector((state) => state.settings);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (entry) => {
    if (Array.isArray(entry)) dispatch(setEditorTheme({ name: entry[0], value: entry[1] }));
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {items.map((entry) => (
          <MenuItem key={entry[0]} selected={entry[0] === 'Amy'} onClick={() => handleClose(entry)}>
            {entry[0]}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
