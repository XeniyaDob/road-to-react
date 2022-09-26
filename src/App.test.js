describe("something truthy and falsy", () => {
  test("true to be true", () => {
    expect(true).toBe(true);
  });
  test("false to be false", () => {
    expect(false).toBe(false);
  });

  describe("App component", () => {
    test("removes an item when clicking the Dismiss button", () => {});
    test("requests some initial stories from an API", () => {});
  });
});

describe("something truthy and falsy", () => {
  it("true to be true", () => {
    expect(true).toBe(true);
  });
  it("false to be false", () => {
    expect(false).toBe(false);
  });
});
