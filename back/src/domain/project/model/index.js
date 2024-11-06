import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
      default: [],
    },
  ],
}, {
  versionKey: false
});

export default mongoose.model('Project', ProjectSchema);
