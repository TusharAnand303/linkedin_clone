import { createContext, useReducer, useContext } from "react";

const UserContext = createContext();

const initialState = {
  userData: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_GOOGLE_DATA":
      return { ...state, userData: action.payload };

    case "SET_MONGO_DATA":
    return { ...state, userData: action.payload };

    case "SET_WHOLE_DATA":
      return { ...state, userData: action.payload };

    case 'CLEAR_USER_DATA':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
