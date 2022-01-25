import React from 'react';
import { ListItemIcon, ListItemText, ListItem } from '@mui/material';

type ListItemProps = {
  onClick?: () => void;
  icon: React.ReactNode;
  text: string;
  disabled?: boolean;
};

const ListItemCustom: React.FC<ListItemProps> = (props) => (
  <ListItem button disabled={props.disabled} onClick={props.onClick}>
    <ListItemIcon>{props.icon}</ListItemIcon>
    <ListItemText>{props.text}</ListItemText>
  </ListItem>
);

export default ListItemCustom;
