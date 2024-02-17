import UserSlice from "./User_reducer";
import company_Slice from "./Company_reducer";
import party_Slice from "./Party_reducer";
import Item_Slice from "./Item_reducer";
import transction_Slice from "./Trasction_reducer";
import billing_reducer from "./billing_reducer";
const reducers = {
  BillingReducer: billing_reducer,
  Loginreducer: UserSlice,
  CompanyReducer: company_Slice,
  PartyReducer: party_Slice,
  ItemReducer: Item_Slice,
  TransctionReducer: transction_Slice,
};
export default reducers;
