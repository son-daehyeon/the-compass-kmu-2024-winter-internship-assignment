import ApiException from '@/common/exception/api-exception';

import { taskRepository } from '@/domain/task/container';

export default async (req, res, next) => {
  const { taskId } = req.params;

  const task = await taskRepository.getTask({ taskId });

  if (!task) {
    next(new ApiException(404, '태스크를 찾을 수 없습니다.'));
    return;
  }

  next();
};
