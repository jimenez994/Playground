
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  tittle: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);
