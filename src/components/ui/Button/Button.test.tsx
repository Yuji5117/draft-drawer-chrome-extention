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

  it("should apply sm size", () => {
    render(<Button size="sm">添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "py-1 px-4 text-sm"
    );
  });

  it("should apply md size", () => {
    render(<Button size="md">添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "py-2 px-6 text-md"
    );
  });

  it("should apply lg size", () => {
    render(<Button size="lg">添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "py-3 px-8 text-lg"
    );
  });

  it("should apply default variant and size", () => {
    render(<Button>添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "bg-primary text-white",
      "py-2 px-6 text-md"
    );
  });

  it("should be disabled when isDisabled is true", () => {
    render(<Button isDisabled={true}>添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toBeDisabled();
  });

  it("should have disabled styling when isDisabled is true", () => {
    render(<Button isDisabled={true}>添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "opacity-50 pointer-events-none"
    );
  });

  it("should not have disabled styling when isDisabled is false", () => {
    render(<Button isDisabled={false}>添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).not.toHaveClass(
      "opacity-50 pointer-events-none"
    );
  });

  it("should apply hover effect when enable", () => {
    render(<Button isDisabled={false}>添削を依頼</Button>);
    expect(screen.getByRole("button", { name: "添削を依頼" })).toHaveClass(
      "hover:opacity-80"
    );
  });
});
