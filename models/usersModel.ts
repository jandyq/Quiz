import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  username: string;
  password: string;
  role: string;
}

let userSchema = new mongoose.Schema({//registering user
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['A', 'U'],
    required: true
    }
  });

export default mongoose.model<User>('User', userSchema);
