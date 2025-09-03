import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("should render children text", () => {
    render(<Button>添削を依頼</Button>);
    expect(
      screen.getByRole("button", { name: "添削を依頼" })
    ).toHaveTextContent("添削を依頼");
  });
});
