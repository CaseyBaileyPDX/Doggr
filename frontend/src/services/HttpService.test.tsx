import { httpClient } from "./HttpService";

it('Is capable of building a client', () => {
  expect(httpClient).toBeDefined();
})