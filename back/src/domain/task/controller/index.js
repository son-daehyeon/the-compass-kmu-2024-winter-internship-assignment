export default class TaskController {
  constructor(taskService) {
    this.taskService = taskService;
  }

  createTask = async (req, res) => {
    const { projectId } = req.params;

    res.success(
      await this.taskService.createTask({
        projectId,
        ...req.body,
      }),
    );
  };

  getTasks = async (req, res) => {
    const { projectId } = req.params;

    res.success(await this.taskService.getTasks({ projectId }));
  };

  updateTask = async (req, res) => {
    const { projectId, taskId } = req.params;

    res.success(
      await this.taskService.updateTask({
        projectId,
        taskId,
        ...req.body,
      }),
    );
  };

  deleteTask = async (req, res) => {
    const { projectId, taskId } = req.params;

    res.success(
      await this.taskService.deleteTask({
        projectId,
        taskId,
      }),
    );
  };
}
