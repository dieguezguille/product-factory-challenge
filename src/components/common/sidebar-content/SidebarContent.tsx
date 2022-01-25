import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CollectionsIcon from '@mui/icons-material/Collections';
import { List, Stack, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ListItemCustom from '../list-item-custom/ListItemCustom';
import AccordionCustom from '../accordion-custom/AccordionCustom';
import { RoutesEnum } from '../../../enums/routes.enum';

const SidebarContent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Toolbar sx={{ overflow: 'auto' }} />
      <List>
        <AccordionCustom isMenu summary="Products">
          <ListItemCustom
            onClick={() => navigate(RoutesEnum.PRODUCTS)}
            icon={<CollectionsIcon />}
            text="All"
          />
          <ListItemCustom
            onClick={() => navigate(RoutesEnum.CREATE_PRODUCT)}
            icon={<AddBoxIcon />}
            text="Add New"
          />
        </AccordionCustom>
        <AccordionCustom isMenu summary="Delegations">
          <ListItemCustom
            onClick={() => navigate(RoutesEnum.PENDING_DELEGATIONS)}
            icon={<CollectionsIcon />}
            text="View Pending"
          />
          <ListItemCustom
            onClick={() => navigate(RoutesEnum.DELEGATE)}
            icon={<AddBoxIcon />}
            text="Delegate"
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
};

export default SidebarContent;
