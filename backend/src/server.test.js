import request from "supertest";
import express from "express";
import setupRoutes from "./routes";

const app = express();
setupRoutes(app);

const apiPath = (route) => {
  return `/api/v1${route}`;
};

describe("Basic Jest functionality test", () => {
  it("Should add 2+3 properly = 5", () => {
    let result = 2 + 3;
    expect(result).toBe(5);
  });
});

describe("Static Routes", () => {
  it(`responds with "GET to /about" text and 200 status code`, async () => {
    let res = await request(app)
      .get(apiPath("/about"))
      .expect(200);

    expect(res.text).toEqual('about:GET');
  });

  it("responds with 404 when route doesn't exist", async () => {
    let res = await request(app)
      .get(apiPath("invalid"))
      .expect(404, {
        message: "This page doesn't exist!",
      });
  });
  
  it("Rejects all non-matching GET requests to each endpoint", async () => {
    return Promise.all(
      verbs
        .filter((value) => { return value !== "get"; })
        .map((verb) => {
          return request(app)
            .get(`/${verb}Example`)
            .expect(404);
        }),
    );
  });
});

// describe("Router paths", async () => {
//
// })

const verbs = [
  "get",
  "post",
  "patch",
  "put",
  "delete",
];
