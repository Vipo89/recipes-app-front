import { ACTION1 } from "./ExamplePageActions";

const initialState = {
  dataExample: [{name: "ReactJS", advanced: "Redux"}],
};

const examplePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION1:
      return {
        ...state,
        dataExample: [...state.dataExample, action.payload.dataExample],
      };
    
    default:
      return state;
  }
};

export default examplePageReducer;
