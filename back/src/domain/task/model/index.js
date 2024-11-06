import mongoose from 'mongoose';

import PRIORITY from '@/domain/task/constant/priority';
import STATUS from '@/domain/task/constant/status';

const TaskSchema = new mongoose.Schema({
  pjId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: Object.values(PRIORITY),
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.NOT_STARTED,
  },
}, {
  versionKey: false
});

export default mongoose.model('Task', TaskSchema);
