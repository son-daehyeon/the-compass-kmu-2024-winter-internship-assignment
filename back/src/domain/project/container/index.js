import ProjectController from '@/domain/project/controller';
import ProjectModel from '@/domain/project/model';
import ProjectRepository from '@/domain/project/repository';
import ProjectService from '@/domain/project/service';

export const projectRepository = new ProjectRepository(ProjectModel);
export const projectService = new ProjectService(projectRepository);
export const projectController = new ProjectController(projectService);
