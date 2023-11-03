import { Schema } from "mongoose";

const userSchemaProperties = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
  },
  logged_at: {
    type: Date,
  },
  sharedTasks: [
    {
      task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
      readOnly: {
        type: Boolean,
        default: true,
      },
    },
  ],
};

export default userSchemaProperties;
