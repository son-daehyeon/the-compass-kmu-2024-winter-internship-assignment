import express from 'express';
import morgan from 'morgan';

import ApiException from '@/common/exception/api-exception';
import { morganFormat, morganOptions } from '@/common/logger';
import injectFormatResponser from '@/common/middleware/inject-format-responser';

import projectRouter from '@/domain/project/router';

import taskRouter from '@/domain/task/router';

const app = express();

app.use(express.json());
app.use(morgan(morganFormat, morganOptions));

app.use(injectFormatResponser);
app.use(projectRouter);
app.use(taskRouter);

app.use((_req, res) => res.error(new ApiException(404, 'Endpoint not found')));
app.use((error, _req, res, _next) => res.error(error));

export default app;
