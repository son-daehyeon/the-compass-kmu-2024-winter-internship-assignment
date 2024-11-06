import { validationResult } from 'express-validator';
import ProjectValidator from '@/domain/project/validator';

const mockRequest = (params = {}, body = {}) => ({
  params,
  body,
});

const validateRequest = async (validations, req) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  return validationResult(req);
};

describe('ProjectValidator', () => {
  const validMongoId = '507f1f77bcf86cd799439011';

  describe('createProject', () => {
    const validCreateData = {
      title: '테스트 프로젝트',
      description: '프로젝트 설명',
    };

    it('유효한 데이터로 프로젝트 생성 시 에러가 없어야 함', async () => {
      const req = mockRequest({}, validCreateData);
      const result = await validateRequest(ProjectValidator.createProject, req);
      expect(result.isEmpty()).toBe(true);
    });

    it('title이 누락된 경우 에러가 발생해야 함', async () => {
      const { title, ...bodyWithoutTitle } = validCreateData;
      const req = mockRequest({}, bodyWithoutTitle);
      const result = await validateRequest(ProjectValidator.createProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('제목은 필수입니다');
    });

    it('description이 누락된 경우 에러가 발생해야 함', async () => {
      const { description, ...bodyWithoutDesc } = validCreateData;
      const req = mockRequest({}, bodyWithoutDesc);
      const result = await validateRequest(ProjectValidator.createProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('설명은 필수입니다');
    });

    it('title이 빈 문자열인 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({}, { ...validCreateData, title: '' });
      const result = await validateRequest(ProjectValidator.createProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('제목은 필수입니다');
    });

    it('description이 빈 문자열인 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({}, { ...validCreateData, description: '' });
      const result = await validateRequest(ProjectValidator.createProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('설명은 필수입니다');
    });
  });

  describe('getProject', () => {
    it('유효한 projectId로 조회 시 에러가 없어야 함', async () => {
      const req = mockRequest({ projectId: validMongoId });
      const result = await validateRequest(ProjectValidator.getProject, req);
      expect(result.isEmpty()).toBe(true);
    });

    it('projectId가 누락된 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({});
      const result = await validateRequest(ProjectValidator.getProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('프로젝트 ID는 필수입니다');
    });

    it('잘못된 형식의 projectId가 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({ projectId: 'invalid-id' });
      const result = await validateRequest(ProjectValidator.getProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('유효하지 않은 프로젝트 ID입니다');
    });

    it('projectId가 빈 문자열인 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({ projectId: '' });
      const result = await validateRequest(ProjectValidator.getProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('프로젝트 ID는 필수입니다');
    });
  });

  describe('deleteProject', () => {
    it('유효한 projectId로 삭제 시 에러가 없어야 함', async () => {
      const req = mockRequest({ projectId: validMongoId });
      const result = await validateRequest(ProjectValidator.deleteProject, req);
      expect(result.isEmpty()).toBe(true);
    });

    it('projectId가 누락된 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({});
      const result = await validateRequest(ProjectValidator.deleteProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('프로젝트 ID는 필수입니다');
    });

    it('잘못된 형식의 projectId가 주어진 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({ projectId: 'invalid-id' });
      const result = await validateRequest(ProjectValidator.deleteProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('유효하지 않은 프로젝트 ID입니다');
    });

    it('projectId가 빈 문자열인 경우 에러가 발생해야 함', async () => {
      const req = mockRequest({ projectId: '' });
      const result = await validateRequest(ProjectValidator.deleteProject, req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toBe('프로젝트 ID는 필수입니다');
    });
  });
});