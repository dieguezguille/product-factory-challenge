import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CollectionsIcon from '@mui/icons-material/Collections';
import { List, Stack, Toolbar } from '@mui/material';

import ListItemCustom from '../list-item-custom/ListItemCustom';
import AccordionCustom from '../accordion-custom/AccordionCustom';

const ToolbarContent: React.FC = () => (
  <>
    <Toolbar sx={{ overflow: 'auto' }} />
    <List>
      <AccordionCustom isMenu summary="Products">
        <ListItemCustom icon={<CollectionsIcon />} text="All" />
        <ListItemCustom icon={<AddBoxIcon />} text="Add New" />
      </AccordionCustom>
      <AccordionCustom isMenu summary="Delegations">
        <ListItemCustom icon={<CollectionsIcon />} text="View Pending" />
        <ListItemCustom icon={<AddBoxIcon />} text="Delegate" />
      </AccordionCustom>
      <Stack
        direction="row"
        sx={{
          bottom: 0,
          position: 'fixed',
          paddingLeft: '4rem',
          paddingBottom: '2rem',
        }}
      ></Stack>
    </List>
  </>
);

export default ToolbarContent;
