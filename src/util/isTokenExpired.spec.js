import { describe, it, test, expect } from "vitest";
import isTokenExpired from "./isTokenExpired";

describe("isTokenExpired: happy path", () => {
  it("should be ok, return true if elapsed time is more than 1 hour, passing 2 params", () => {
    const time = new Date(1);
    expect(isTokenExpired(time.getTime(), 3600)).toBe(true);
  });

  it("should be ok, return false if elapsed time is less than 1 hour, passing 2 params", () => {
    const nowTime = new Date();
    expect(isTokenExpired(nowTime.getTime(), 3600)).toBe(false);
  });

  it("should be ok, return true if elapsed time is more than 1 hour, passing only the creationDate", () => {
    const time = new Date(1);
    expect(isTokenExpired(time.getTime())).toBe(true);
  });

  it("should be ok, return false if elapsed time is less than 1 hour, passing only the creationDate", () => {
    const nowTime = new Date();
    expect(isTokenExpired(nowTime.getTime())).toBe(false);
  });
});

describe("isTokenExpired: error handling", () => {
  test("should fail if call function without params", () => {
    expect(() => isTokenExpired()).toThrow(
      new Error("creationDate is not defined"),
    );
  });

  test("should fail if creationDate param is not a number - string", () => {
    expect(() => isTokenExpired("asdf")).toThrow(
      new Error("creationDate is not a valid number"),
    );
  });
  test("should fail if creationDate param is not a number - object", () => {
    expect(() => isTokenExpired({})).toThrow(
      new Error("creationDate is not a valid number"),
    );
  });

  // TODO: Some corner cases pending like boolean (true/false), hex and more
});
