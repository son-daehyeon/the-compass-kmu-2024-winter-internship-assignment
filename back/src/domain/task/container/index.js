import { projectRepository } from '@/domain/project/container';

import TaskController from '@/domain/task/controller';
import TaskModel from '@/domain/task/model';
import TaskRepository from '@/domain/task/repository';
import TaskService from '@/domain/task/service';

export const taskRepository = new TaskRepository(TaskModel);
export const taskService = new TaskService(taskRepository, projectRepository);
export const taskController = new TaskController(taskService);
