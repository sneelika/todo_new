import { Schema } from "mongoose";

const taskSchemaProperties = {
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
  sharedWith: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      readOnly: {
        type: Boolean,
        default: true,
      },
    },
  ],
};

export default taskSchemaProperties;
