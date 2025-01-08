
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  tittle: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Task', TaskSchema);
