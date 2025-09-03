import { render, screen } from "@testing-library/react";
import { Text } from "./Text";

describe("Text Component", () => {
  it("should render children text", () => {
    render(<Text>テンプレートの作成</Text>);
    expect(screen.getByText("テンプレートの作成")).toBeInTheDocument();
  });

  it("should apply sm size", () => {
    render(<Text size="sm">テンプレートの作成</Text>);
    const textElement = screen.getByText("テンプレートの作成");
    expect(textElement).toHaveClass("text-sm");
  });

  it("should apply lg size", () => {
    render(<Text size="lg">テンプレートの作成</Text>);
    const textElement = screen.getByText("テンプレートの作成");
    expect(textElement).toHaveClass("text-lg");
  });

  it("should apply white text", () => {
    render(<Text variant="white">テンプレートの作成</Text>);
    const textElement = screen.getByText("テンプレートの作成");
    expect(textElement).toHaveClass("text-white");
  });

  it("should apply custom className", () => {
    render(<Text className="font-bold">テンプレートの作成</Text>);
    const textElement = screen.getByText("テンプレートの作成");
    expect(textElement).toHaveClass("font-bold");
  });

  it("should apply default size and variant", () => {
    render(<Text className="font-bold">テンプレートの作成</Text>);
    const textElement = screen.getByText("テンプレートの作成");
    expect(textElement).toHaveClass("text-md", "text-black");
  });

  it("should apply multiple properties", () => {
    render(
      <Text size="sm" variant="white" className="font-bold">
        テンプレートの作成
      </Text>
    );
    const textElement = screen.getByText("テンプレートの作成");
    expect(textElement).toHaveClass("text-sm", "text-white", "font-bold");
  });
});
