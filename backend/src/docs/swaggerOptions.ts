import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API',
      version: '1.0.0',
      description: 'API docs for Portfolio backend (Express + TS)'
    },
    // servers: [{ url: `${process.env.API_URL}:${process.env.PORT}` }],
    components: {
      schemas: {
        PortfolioItem: {
          type: "object",
          properties: {
            no: { type: "integer" },
            name: { type: "string" },
            sector: { type: "string" },
            purchasePrice: { type: "number" },
            quantity: { type: "number" },
            investment: { type: "number" },
            portfolioPercent: { type: "number" },
            symbol: { type: "string" },
            cmp: { type: "number" },
            presentValue: { type: "number" },
            gainLoss: { type: "number" },
            gainLossPercent: { type: "number" },
            marketCap: { type: "number" },
            peRatio: { type: "number", nullable: true },
            latestEarnings: { type: "number", nullable: true }
          }
        }
      }
  }
},
  apis: ['./src/api/routes/*.ts','./src/types/*.ts'] 
};
