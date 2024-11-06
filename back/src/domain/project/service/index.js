import ApiException from '@/common/exception/api-exception';

export default class ProjectService {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async createProject({ title, description }) {
    const project = (await this.projectRepository.createProject({ title, description })).toObject();

    delete project.tasks;

    return project;
  }

  async getProjects() {
    return await this.projectRepository.getProjects();
  }

  async getProject({ projectId }) {
    return this.projectRepository.getProject({ projectId });
  }

  async deleteProject({ projectId }) {
    const project = await this.projectRepository.getProject({ projectId });

    if (project.tasks.length > 0) {
      throw new ApiException(400, '프로젝트에 태스크가 있어 삭제할 수 없습니다');
    }

    await this.projectRepository.deleteProject({ projectId });

    return { message: '프로젝트가 삭제되었습니다' };
  }
}
