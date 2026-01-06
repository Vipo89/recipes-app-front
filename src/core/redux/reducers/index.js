import { combineReducers } from 'redux';
import examplePageReducer from '../../../pages/ExamplePage/ExamplePageReducer';

const reducer = combineReducers({
  // Aqui iran todos los reducers que creemos de los componentes
  examplePageReducer
});

export default reducer;
