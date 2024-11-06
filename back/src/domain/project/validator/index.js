import { body, param } from 'express-validator';

export default class ProjectValidator {
  static createProject = [
    body('title').notEmpty().withMessage('제목은 필수입니다'),
    body('description').notEmpty().withMessage('설명은 필수입니다'),
  ];

  static getProject = [
    param('projectId')
      .notEmpty()
      .withMessage('프로젝트 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 프로젝트 ID입니다'),
  ];

  static deleteProject = [
    param('projectId')
      .notEmpty()
      .withMessage('프로젝트 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 프로젝트 ID입니다'),
  ];
}
