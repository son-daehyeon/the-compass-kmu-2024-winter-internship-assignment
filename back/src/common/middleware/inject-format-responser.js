import ApiException from '@/common/exception/api-exception';
import logger from '@/common/logger';

export default (_req, res, next) => {
  res.success = (data) => {
    res.status(200).json({
      error: null,
      data,
    });
  };

  res.error = (error) => {
    const isApiException = error instanceof ApiException;

    if (!isApiException) {
      logger.error(error.stack);
    }

    res.status(isApiException ? error.status : 500).json({
      error: isApiException ? error.message : 'Internal server error',
      data: null,
    });
  };

  next();
};
