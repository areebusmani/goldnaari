import AuthOtp from "./authOtp.js";
import AuthToken from "./authToken.js";
import Collection from "./collection.js";
import Plan from "./plan.js";
import Store from './store.js';

Collection.belongsTo(Store);
Collection.belongsTo(Plan);
Plan.belongsTo(Store);
Plan.hasMany(Collection);
Store.hasMany(Plan);
Store.hasMany(Collection);

export {AuthOtp, AuthToken, Collection, Plan, Store};
