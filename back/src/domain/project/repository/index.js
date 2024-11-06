export default class ProjectRepository {
  constructor(projectModel) {
    this.projectModel = projectModel;
  }

  async createProject({ title, description }) {
    const project = new this.projectModel({
      title,
      description,
    });

    return project.save();
  }

  async getProjects() {
    return this.projectModel.find().select('-tasks');
  }

  async getProject({ projectId }) {
    return this.projectModel.findById(projectId);
  }

  async deleteProject({ projectId }) {
    await this.projectModel.findByIdAndDelete(projectId);
  }

  async addTask({ projectId, taskId }) {
    return this.projectModel.findByIdAndUpdate(projectId, { $push: { tasks: taskId } });
  }

  async removeTask({ projectId, taskId }) {
    await this.projectModel.findByIdAndUpdate(projectId, { $pull: { tasks: taskId } });
  }
}
