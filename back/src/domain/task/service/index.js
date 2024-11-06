import ApiException from '@/common/exception/api-exception';

export default class TaskService {
  constructor(taskRepository, projectRepository) {
    this.taskRepository = taskRepository;
    this.projectRepository = projectRepository;
  }

  async createTask({ pjId, projectId, title, description, priority, dueDate }) {
    if (pjId !== projectId) {
      throw new ApiException(400, '유효하지 않은 프로젝트 ID입니다');
    }

    const task = await this.taskRepository.createTask({ projectId, title, description, priority, dueDate });

    await this.projectRepository.addTask({ projectId, taskId: task._id });

    return task;
  }

  async getTasks({ projectId }) {
    return this.taskRepository.getTasks({ projectId });
  }

  async updateTask({ projectId, taskId, title, description, priority, status, dueDate }) {
    return this.taskRepository.updateTask({ projectId, taskId, title, description, priority, status, dueDate });
  }

  async deleteTask({ projectId, taskId }) {
    await this.taskRepository.deleteTask({ projectId, taskId });
    await this.projectRepository.removeTask({ projectId, taskId });

    return { message: '태스크가 삭제되었습니다' };
  }
}
