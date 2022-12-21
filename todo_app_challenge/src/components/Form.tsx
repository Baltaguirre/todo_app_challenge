import React from "react";
import { FC } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../redux/store/actions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

interface IFormProps {
  title: string;
  setTitle: any;
  addItem: any;
  editItem: any;
  edit: any;
  error: any;
  setError: any;
}

const useStyles = makeStyles({
  root: {
    marginTop: 16,
    marginBottom: 16,
    padding: 16,
    boxShadow:
      "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
  },
  button: {
    marginTop: 16,
  },
});

const Form: FC<IFormProps> = ({
  title,
  setTitle,
  addItem,
  editItem,
  edit,
  error,
  setError,
}) => {
  const classes = useStyles();
  const handleDescriptionChange = (event: any) => {
    event.preventDefault();
    const title = event.target.value;

    setTitle(title);
    if (title.length === 0) {
      setError("ingresá la descripción!");
    } else {
      setError("");
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (title.length === 0) {
      setError("ingresá la descripción!");
      return;
    }
    if (edit) {
      editItem();
    } else {
      addItem();
    }
  };
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Grid container alignItems="center">
        <Grid item md={12}>
          <TextField
            value={title}
            onChange={handleDescriptionChange}
            error={!!error}
            helperText={error}
            id="outlined-basic"
            fullWidth
            label="Ej: comprar agua..."
            multiline
            variant="outlined"
          />
        </Grid>
        <Grid item md={12}>
          {edit ? (
            <IconButton
              edge="end"
              aria-label="Add"
              onClick={(e) => handleSubmit(e)}
            >
              <EditIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              aria-label="Add"
              onClick={(e) => handleSubmit(e)}
            >
              <AddIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
const mapStateToProps = (state: { title: any; edit: any; error: any }) => {
  return {
    title: state.title,
    edit: state.edit,
    error: state.error,
  };
};

const mapDispatchToProps = (
  dispatch: (arg0: {
    type: string;
    title?: any;
    error?: any;
    item?: any;
  }) => any
) => {
  return {
    setTitle: (title: any) => dispatch(actionTypes.setTitle(title)),
    setError: (error: any) => dispatch(actionTypes.setError(error)),
    addItem: () => dispatch(actionTypes.addItem()),
    editItem: (item: any) => dispatch(actionTypes.editItem(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
