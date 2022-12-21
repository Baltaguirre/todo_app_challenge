import React, { FC, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { item } from "../typesDefs";
import * as actionTypes from "../redux/store/actions";

interface IMyTableProps {
  todoList: [];
  setTitle: (val: string) => void;
  setItem: (val: item) => void;
  setEdit: () => void;
  deleteItem: (val: item) => void;
  getTodos: any;
}

interface Column {
  id: "id" | "title" | "completed" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center";
  format?: (value: number) => string;
  render?: any;
}

const TodoTable: FC<IMyTableProps> = ({
  todoList,
  setTitle,
  setItem,
  setEdit,
  deleteItem,
}) => {
  //pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: any, newPage: number) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //table
  const columns: readonly Column[] = [
    { id: "id", label: "N° Todo", minWidth: 70 },
    { id: "title", label: "Descripción", minWidth: 100 },
    {
      id: "completed",
      label: "Completado",
      minWidth: 190,
      align: "center",
    },
    {
      id: "actions",
      label: "Acciones",
      minWidth: 75,
      align: "right",
      render: (item: any) => {
        return (
          <>
            <IconButton
              edge="end"
              aria-label="edit"
              onClick={(e) => handleEdit(e, item)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={(e) => handleDelete(e, item)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];
  //todo actions
  const handleEdit = (event: any, item: any) => {
    event.preventDefault();
    setTitle(item.value ? item.value : item.title);
    setEdit();
    setItem(item);
  };

  const handleDelete = (event: any, item: any) => {
    event.preventDefault();
    setItem(item);
    deleteItem(item);
  };

  return (
    <Paper>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {todoList
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {typeof value === "number" || typeof value === "string"
                          ? value
                          : value === true
                          ? "✔️"
                          : value === false
                          ? "❌"
                          : column.render(row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
        component="div"
        count={todoList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={() => {
          return `${page}-${Math.floor(todoList.length / rowsPerPage)}`;
        }}
      />
    </Paper>
  );
};

const mapStateToProps = (state: { items: any }) => {
  return {
    todoList: state.items,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setTitle: (title: any) => dispatch(actionTypes.setTitle(title)),
    setItem: (item: any) => dispatch(actionTypes.setItem(item)),
    deleteItem: (item: any) => dispatch(actionTypes.deleteItem(item)),
    setEdit: () => dispatch(actionTypes.setEdit()),
    getTodos: () => dispatch(actionTypes.getTodos()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoTable);
