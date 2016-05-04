/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Lottery.Collection.MapAgent = new Mongo.Collection("lottery_mapAgent");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Lottery.Schema.MapAgent = new SimpleSchema({
  detail:{
    type: [Object]
  },
  'detail.$.agent': {
    type: String
  },
  mainAgent: {
    type: String,
    label: "Main Agent"
  }
});
/**
 * Attach schema
 */
Lottery.Collection.MapAgent.attachSchema(Lottery.Schema.MapAgent);
