export default class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  createProject = async (req, res) => {
    res.success(await this.projectService.createProject(req.body));
  };

  getProjects = async (_req, res) => {
    res.success(await this.projectService.getProjects());
  };

  getProject = async (req, res) => {
    const { projectId } = req.params;

    res.success(await this.projectService.getProject({ projectId }));
  };

  deleteProject = async (req, res) => {
    const { projectId } = req.params;

    res.success(await this.projectService.deleteProject({ projectId }));
  };
}
