import * as actionTypes from "../actions/actionTypes";
interface IStateItems {
  items: any[];
  title: string;
  item: string;
  edit: boolean;
  error: string;
}
const initialState: IStateItems = {
  items: [],
  title: "",
  item: "",
  edit: false,
  error: "",
};

const reducer = (
  state = initialState,
  action: { type: any; title: any; item: any; error: any; payload: any }
) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      const newitem = {
        userId: Math.ceil(Math.random() * 2),
        id: state.items[state.items.length - 1].id + 1,
        title: state.title,
        completed: false,
      };
      return {
        ...state,
        items: state.items.concat(newitem as any),
        title: "",
        error: "",
      };

    case actionTypes.EDIT_ITEM:
      let newList = [...state.items];
      let index = newList.indexOf(state.item);
      if (index !== -1) {
        newList[index].title = state.title;
        return {
          ...state,
          title: "",
          edit: false,
          items: newList,
          error: "",
        };
      } else {
        return {
          ...state,
        };
      }
    case actionTypes.DELETE_ITEM:
      let newStateList = [...state.items];

      let deleteIndex = newStateList.indexOf(state.item);
      if (deleteIndex !== -1) {
        newStateList.splice(deleteIndex, 1);
        return {
          ...state,
          items: newStateList,
        };
      } else {
        return {
          ...state,
        };
      }
    case actionTypes.SET_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case actionTypes.SET_ITEM:
      return {
        ...state,
        item: action.item,
        error: "",
      };
    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.SET_EDIT:
      return {
        ...state,
        edit: true,
        error: "",
      };
    case actionTypes.GET_TODOS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
