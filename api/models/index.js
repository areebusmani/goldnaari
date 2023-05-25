import Collection from "./collection.js";
import Plan from "./plan.js";
import Store from './store.js';

Collection.belongsTo(Store);
Collection.belongsTo(Plan);
Plan.belongsTo(Store);
Plan.hasMany(Collection);
Store.hasMany(Plan);
Store.hasMany(Collection);

export {Collection, Plan, Store};
