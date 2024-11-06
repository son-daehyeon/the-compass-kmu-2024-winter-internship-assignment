import { body, param } from 'express-validator';

import PRIORITY from '@/domain/task/constant/priority';
import STATUS from '@/domain/task/constant/status';

export default class TaskValidator {
  static createTask = [
    param('projectId')
      .notEmpty()
      .withMessage('프로젝트 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 프로젝트 ID입니다'),
    body('pjId')
      .notEmpty()
      .withMessage('프로젝트 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 프로젝트 ID입니다'),
    body('title').notEmpty().withMessage('제목은 필수입니다'),
    body('description').notEmpty().withMessage('설명은 필수입니다'),
    body('priority')
      .notEmpty()
      .withMessage('우선순위는 필수입니다')
      .isIn(Object.values(PRIORITY))
      .withMessage('유효하지 않은 우선순위입니다'),
    body('dueDate').isDate().withMessage('마감일은 날짜여야 합니다').notEmpty().withMessage('마감일은 필수입니다'),
  ];

  static getTasks = [
    param('projectId')
      .notEmpty()
      .withMessage('프로젝트 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 프로젝트 ID입니다'),
  ];

  static updateTask = [
    param('projectId')
      .notEmpty()
      .withMessage('프로젝트 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 프로젝트 ID입니다'),
    param('taskId')
      .notEmpty()
      .withMessage('태스크 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 태스크 ID입니다'),
    body('title').notEmpty().withMessage('제목은 필수입니다'),
    body('priority')
      .notEmpty()
      .withMessage('우선순위는 필수입니다')
      .isIn(Object.values(PRIORITY))
      .withMessage('유효하지 않은 우선순위입니다'),
    body('dueDate').isDate().withMessage('마감일은 날짜여야 합니다').notEmpty().withMessage('마감일은 필수입니다'),
    body('status')
      .notEmpty()
      .withMessage('상태는 필수입니다')
      .isIn(Object.values(STATUS))
      .withMessage('유효하지 않은 상태입니다'),
  ];

  static deleteTask = [
    param('projectId')
      .notEmpty()
      .withMessage('프로젝트 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 프로젝트 ID입니다'),
    param('taskId')
      .notEmpty()
      .withMessage('태스크 ID는 필수입니다')
      .isMongoId()
      .withMessage('유효하지 않은 태스크 ID입니다'),
  ];
}
