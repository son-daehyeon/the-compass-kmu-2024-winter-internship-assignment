import ApiException from '@/common/exception/api-exception';

import { projectRepository } from '@/domain/project/container';

export default async (req, res, next) => {
  const { projectId } = req.params;

  const project = await projectRepository.getProject({ projectId });

  if (!project) {
    next(new ApiException(404, '프로젝트를 찾을 수 없습니다.'));
    return;
  }

  next();
};
