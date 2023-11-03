import { Schema } from "mongoose";

const categorySchemaProperties = {
  name: {
    type: String,
    required: true,
  },
  isEditable: {
    type: Boolean,
    required: false,
    default: true,
  },
  color: {
    id: String,
    name: String,
    code: String,
  },
  icon: {
    id: String,
    name: String,
    symbol: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
};

export default categorySchemaProperties;
