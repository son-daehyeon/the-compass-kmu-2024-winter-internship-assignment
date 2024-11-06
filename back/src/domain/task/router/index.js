import express from 'express';

import asyncController from '@/common/controller/async-controller';
import checkValidated from '@/common/middleware/check-validated';

import checkProject from '@/domain/project/middleware/check-project';

import { taskController } from '@/domain/task/container';
import checkTask from '@/domain/task/middleware/check-task';
import TaskValidator from '@/domain/task/validator';

const router = express.Router();

router.post(
  '/projects/:projectId/tasks',
  TaskValidator.createTask,
  checkValidated,
  checkProject,
  asyncController(taskController.createTask),
);

router.get(
  '/projects/:projectId/tasks',
  TaskValidator.getTasks,
  checkValidated,
  checkProject,
  asyncController(taskController.getTasks),
);

router.put(
  '/projects/:projectId/tasks/:taskId',
  TaskValidator.updateTask,
  checkValidated,
  checkProject,
  checkTask,
  asyncController(taskController.updateTask),
);

router.delete(
  '/projects/:projectId/tasks/:taskId',
  TaskValidator.deleteTask,
  checkValidated,
  checkProject,
  checkTask,
  asyncController(taskController.deleteTask),
);

export default router;
