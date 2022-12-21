import React, { FC, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { item } from "../typesDefs";
import * as actionTypes from "../redux/store/actions";
import TodoTable from "./TodoTable";

interface ITodoListProps {
  todoList: item[];
  getTodos: any;
}
const useStyles = makeStyles({
  container: {
    padding: 16,
  },
});

const TodoList: FC<ITodoListProps> = ({ todoList, getTodos }) => {
  const classes = useStyles();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Container className={classes.container} maxWidth="md">
      {!todoList.length ? (
        <Typography variant="h6" color="error">
          No se encontraron todos...
        </Typography>
      ) : (
        <TodoTable />
      )}
    </Container>
  );
};
const mapStateToProps = (state: { items: any }) => {
  return {
    todoList: state.items,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTodos: () => dispatch(actionTypes.getTodos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
