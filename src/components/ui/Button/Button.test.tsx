import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button Component", () => {
  it("should render children text", () => {
    render(<Button>添削を依頼</Button>);
    expect(
      screen.getByRole("button", { name: "添削を依頼" })
    ).toHaveTextContent("添削を依頼");
  });

  it("should apply primary variant", () => {
    render(<Button variant="primary">添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "bg-primary text-white"
    );
  });
  it("should apply danger variant", () => {
    render(<Button variant="danger">添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "border border-red text-red"
    );
  });
});
