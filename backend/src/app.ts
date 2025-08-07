import express from 'express';
import cors from 'cors';
import portfolioRoutes from './api/routes/portfolio.route';
import { errorMiddleware } from './middlewares/error.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import healthRoutes from './api/routes/health.route';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './docs/swaggerOptions';



const app = express();

app.use(cors());
app.use(express.json());

app.use(requestLogger);

const specs = swaggerJsdoc(swaggerOptions);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/health', healthRoutes);
// Error middleware
app.use(errorMiddleware);

export default app;
