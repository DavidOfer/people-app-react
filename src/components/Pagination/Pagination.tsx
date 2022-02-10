import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationControlled:React.FC<{page:number,handleChange:(event: React.ChangeEvent<unknown>, value: number)=>void}> = (props)=> {

  return (
    <Stack spacing={2}>
      <Pagination count={4} page={props.page} onChange={props.handleChange} />
    </Stack>
  );
}
export default PaginationControlled;