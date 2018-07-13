let Proto = require('./bundle.json');
let ProtobufRoot = require('protobufjs').Root;
let root = ProtobufRoot.fromJSON(Proto);
const MessageMap = new Map();
/*let BaseMsg = root.lookupType("com.qiqiim.server.model.proto.Model");
MessageMap.set('Base', BaseMsg);
let BodyMsg = root.lookupType("com.qiqiim.server.model.proto.MessageBody");
MessageMap.set('Body', BodyMsg);*/
export default MessageMap;