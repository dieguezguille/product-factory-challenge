import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import { Stack, Typography } from '@mui/material';
import { SystemProps } from '@mui/system';
import React from 'react';

type EmptyDataProps = {
  text?: string;
  showIcon?: boolean;
} & SystemProps;

const EmptyData: React.FC<EmptyDataProps> = ({
  text,
  showIcon = true,
  ...props
}) => (
  <Stack
    {...props}
    spacing={2}
    alignContent="center"
    alignItems="center"
    sx={{ opacity: '60%' }}
  >
    {showIcon && (
      <HelpTwoToneIcon sx={{ width: '2em', height: '2em', opacity: '20%' }} />
    )}
    <Typography variant="body1">No data to display</Typography>
  </Stack>
);

export default EmptyData;
