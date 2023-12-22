import React from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';

interface TablePaginationProps {
  totalPages: number;
  page: number;
  onPageChange: (event: any, value: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({ totalPages, page, onPageChange }) => {
  return (
    <div className="table-pagination">
      <Pagination
        variant="outlined"
        shape="rounded"
        count={totalPages}
        page={page}
        onChange={onPageChange}
        renderItem={(item) => (
          <PaginationItem
            classes={{
              root: 'pagination-page',
              outlined: 'pagination-page-outlined',
            }}
            {...item}
          />
        )}
      />
    </div>
  );
};

export default TablePagination;
