import express from 'express';

import asyncController from '@/common/controller/async-controller';
import checkValidated from '@/common/middleware/check-validated';

import { projectController } from '@/domain/project/container';
import checkProject from '@/domain/project/middleware/check-project';
import ProjectValidator from '@/domain/project/validator';

const router = express.Router();

router.post(
  '/projects',
  ProjectValidator.createProject,
  checkValidated,
  asyncController(projectController.createProject),
);

router.get('/projects', asyncController(projectController.getProjects));

router.get(
  '/projects/:projectId',
  ProjectValidator.getProject,
  checkValidated,
  checkProject,
  asyncController(projectController.getProject),
);

router.delete(
  '/projects/:projectId',
  ProjectValidator.deleteProject,
  checkValidated,
  checkProject,
  asyncController(projectController.deleteProject),
);

export default router;
