import { setupServer } from "msw/node";

const server = setupServer();

export const setupAppServer = () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
};
