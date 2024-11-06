import { validationResult } from 'express-validator';

import ApiException from '@/common/exception/api-exception';

export default (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new ApiException(400, errors.array()[0].msg));
    return;
  }

  next();
};
