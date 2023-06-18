import { combineReducers } from "redux";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../async/asyncReducer";
import modalReducer from "../common/modals/ModalReducer";
import profileReducer from '../../features/profile/profileReducer';
import AddMissingPersonReducer from '../../features/AddMissingPerson/AddMissingPersonReducer'
import AddFoundPersonReducer from '../../features/AddFoundPerson/AddFoundPersonReducer';
import adminReducer from '../../admin/adminReducer';
import viewReducer from '../../features/Views/viewReducer';
import Identifiedreducer from '../../features/Identified/IdentifiedReducer';

const rootReducer = combineReducers({
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile:profileReducer,
  event: AddMissingPersonReducer,
  FoundPerson: AddFoundPersonReducer,
  admin: adminReducer,
  userProfile: viewReducer,
  identified: Identifiedreducer
});

export default rootReducer;
