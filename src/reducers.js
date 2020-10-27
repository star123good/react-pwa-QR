import { combineReducers } from "redux";

//Import for OneInvite.js

import {
  CONDUCT_CLICKED
} from './actions';

// Reducers  OneInvite.js
const conductReducer = (state = {
  roleone: '',
  roletwo: '',
  contractId: '',
  avcore: '',
}, action) => {
  if (action.type === CONDUCT_CLICKED) {
    if (action.payload.avcore === 'vc') {
      localStorage.setItem('aciti', action.payload.roleone);
      localStorage.setItem('acid', action.payload.contractId);
    }
    return {
      roleone: action.payload.roleone,
      roletwo: action.payload.roletwo,
      contractId: action.payload.contractId,
      avcore: action.payload.avcore,
    }
  }

  return state;
};
// Root Reducers for OneInvite.js
export default combineReducers({
  conduct: conductReducer
});

