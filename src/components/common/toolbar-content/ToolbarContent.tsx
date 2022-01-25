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
        <ListItemCustom
          // onClick={() => navigate(RoutesEnum.NFT_COL_GALLERY)}
          icon={<CollectionsIcon />}
          text="Test"
        />
        <ListItemCustom
          // onClick={() => navigate(RoutesEnum.NFT_COL_CREATE)}
          icon={<AddBoxIcon />}
          text="Test2"
        />
      </AccordionCustom>
      <AccordionCustom isMenu summary="Delegations">
        <ListItemCustom
          // onClick={() => navigate(RoutesEnum.TOKEN_GALLERY)}
          icon={<CollectionsIcon />}
          text="See delegations"
        />
        <ListItemCustom
          // onClick={() => navigate(RoutesEnum.TOKEN_CREATE)}
          icon={<AddBoxIcon />}
          text="Delegate product"
        />
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
