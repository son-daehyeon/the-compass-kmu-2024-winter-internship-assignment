import { validationResult } from 'express-validator';

import PRIORITY from '@/domain/task/constant/priority';
import STATUS from '@/domain/task/constant/status';
import TaskValidator from '@/domain/task/validator';

const mockRequest = (params = {}, body = {}) => ({
  params,
  body,
});

const validateRequest = async (validations, req) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  return validationResult(req);
};

describe('TaskValidator', () => {
  const validMongoId = '507f1f77bcf86cd799439011';
  
  describe('createTask', () => {
    const validCreateData = {
      params: { projectId: validMongoId },
      body: {
        pjId: validMongoId,
        title: '테스트 태스크',
        description: '태스크 설명',
        priority: PRIORITY.HIGH,
        dueDate: '2024-12-31',
      },
    };

    it('유효한 데이터로 태스크 생성 시 에러가 없어야 함', async () => {
      const req = mockRequest(validCreateData.params, validCreateData.body);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.isEmpty()).toBe(true);
    });

    it('projectId가 누락된 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({}, validCreateData.body);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('프로젝트 ID는 필수입니다');
    });

    it('잘못된 형식의 projectId가 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({ projectId: 'invalid-id' }, validCreateData.body);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('유효하지 않은 프로젝트 ID입니다');
    });

    it('pjId가 누락된 경우 에러가 발생해야 함', async () => {
      const { pjId, ...bodyWithoutPjId } = validCreateData.body;
      const req = mockRequest(validCreateData.params, bodyWithoutPjId);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('프로젝트 ID는 필수입니다');
    });

    it('title이 누락된 경우 에러가 발생해야 함', async () => {
      const { title, ...bodyWithoutTitle } = validCreateData.body;
      const req = mockRequest(validCreateData.params, bodyWithoutTitle);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('제목은 필수입니다');
    });

    it('description이 누락된 경우 에러가 발생해야 함', async () => {
      const { description, ...bodyWithoutDesc } = validCreateData.body;
      const req = mockRequest(validCreateData.params, bodyWithoutDesc);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('설명은 필수입니다');
    });

    it('priority가 누락된 경우 에러가 발생해야 함', async () => {
      const { priority, ...bodyWithoutPriority } = validCreateData.body;
      const req = mockRequest(validCreateData.params, bodyWithoutPriority);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('우선순위는 필수입니다');
    });

    it('잘못된 priority 값이 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest(validCreateData.params, {
        ...validCreateData.body,
        priority: 'INVALID_PRIORITY',
      });
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('유효하지 않은 우선순위입니다');
    });

    it('dueDate가 누락된 경우 에러가 발생해야 함', async () => {
      const { dueDate, ...bodyWithoutDueDate } = validCreateData.body;
      const req = mockRequest(validCreateData.params, bodyWithoutDueDate);
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('마감일은 날짜여야 합니다');
    });

    it('잘못된 형식의 dueDate가 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest(validCreateData.params, {
        ...validCreateData.body,
        dueDate: 'invalid-date',
      });
      const result = await validateRequest(TaskValidator.createTask, req);
      expect(result.array()[0].msg).toBe('마감일은 날짜여야 합니다');
    });
  });

  describe('getTasks', () => {
    it('유효한 projectId로 조회 시 에러가 없어야 함', async () => {
      const req = mockRequest({ projectId: validMongoId });
      const result = await validateRequest(TaskValidator.getTasks, req);
      expect(result.isEmpty()).toBe(true);
    });

    it('projectId가 누락된 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({});
      const result = await validateRequest(TaskValidator.getTasks, req);
      expect(result.array()[0].msg).toBe('프로젝트 ID는 필수입니다');
    });

    it('잘못된 형식의 projectId가 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({ projectId: 'invalid-id' });
      const result = await validateRequest(TaskValidator.getTasks, req);
      expect(result.array()[0].msg).toBe('유효하지 않은 프로젝트 ID입니다');
    });
  });

  describe('updateTask', () => {
    const validUpdateData = {
      params: {
        projectId: validMongoId,
        taskId: validMongoId,
      },
      body: {
        title: '수정된 태스크',
        priority: PRIORITY.LOW,
        dueDate: '2024-12-31',
        status: STATUS.IN_PROGRESS,
      },
    };

    it('유효한 데이터로 태스크 수정 시 에러가 없어야 함', async () => {
      const req = mockRequest(validUpdateData.params, validUpdateData.body);
      const result = await validateRequest(TaskValidator.updateTask, req);
      expect(result.isEmpty()).toBe(true);
    });

    it('잘못된 형식의 taskId가 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest(
        { ...validUpdateData.params, taskId: 'invalid-id' },
        validUpdateData.body
      );
      const result = await validateRequest(TaskValidator.updateTask, req);
      expect(result.array()[0].msg).toBe('유효하지 않은 태스크 ID입니다');
    });

    it('잘못된 status 값이 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest(validUpdateData.params, {
        ...validUpdateData.body,
        status: 'INVALID_STATUS',
      });
      const result = await validateRequest(TaskValidator.updateTask, req);
      expect(result.array()[0].msg).toBe('유효하지 않은 상태입니다');
    });
  });

  describe('deleteTask', () => {
    it('유효한 ID로 태스크 삭제 시 에러가 없어야 함', async () => {
      const req = mockRequest({
        projectId: validMongoId,
        taskId: validMongoId,
      });
      const result = await validateRequest(TaskValidator.deleteTask, req);
      expect(result.isEmpty()).toBe(true);
    });

    it('taskId가 누락된 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({ projectId: validMongoId });
      const result = await validateRequest(TaskValidator.deleteTask, req);
      expect(result.array()[0].msg).toBe('태스크 ID는 필수입니다');
    });

    it('잘못된 형식의 taskId가 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({
        projectId: validMongoId,
        taskId: 'invalid-id',
      });
      const result = await validateRequest(TaskValidator.deleteTask, req);
      expect(result.array()[0].msg).toBe('유효하지 않은 태스크 ID입니다');
    });
  });
});
