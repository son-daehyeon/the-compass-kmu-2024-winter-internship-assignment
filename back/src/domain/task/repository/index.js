export default class TaskRepository {
  constructor(taskModel) {
    this.taskModel = taskModel;
  }

  async createTask({ projectId, title, description, priority, dueDate }) {
    const task = new this.taskModel({
      pjId: projectId,
      title,
      description,
      priority,
      dueDate,
    });

    return task.save();
  }

  async getTasks({ projectId }) {
    return this.taskModel.find({ pjId: projectId });
  }

  async getTask({ taskId }) {
    return this.taskModel.findById(taskId);
  }

  async updateTask({ projectId, taskId, title, description, priority, status, dueDate }) {
    return this.taskModel.findOneAndUpdate(
      { _id: taskId, pjId: projectId },
      { title, description, priority, status, dueDate },
      { new: true, runValidators: true },
    );
  }

  async deleteTask({ projectId, taskId }) {
    await this.taskModel.findOneAndDelete({ _id: taskId, pjId: projectId });
  }
}
