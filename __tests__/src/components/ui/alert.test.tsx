import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "../../../../src/components/ui/alert";

describe("Alert", () => {
  it("renders alert with default variant", () => {
    render(
      <Alert data-testid="alert">
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );
    
    const alert = screen.getByTestId("alert");
    expect(alert).toBeDefined();
    expect(alert.getAttribute("role")).toBe("alert");
    expect(alert.className).toContain("bg-background");
  });

  it("renders alert with destructive variant", () => {
    render(
      <Alert variant="destructive" data-testid="alert">
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );
    
    const alert = screen.getByTestId("alert");
    expect(alert).toBeDefined();
    expect(alert.className).toContain("text-destructive");
  });

  it("renders alert title with correct styling", () => {
    render(<AlertTitle data-testid="alert-title">Test Title</AlertTitle>);
    
    const title = screen.getByTestId("alert-title");
    expect(title).toBeDefined();
    expect(title.className).toContain("font-medium");
    expect(title.tagName.toLowerCase()).toBe("h5");
  });

  it("renders alert description with correct styling", () => {
    render(<AlertDescription data-testid="alert-desc">Test Description</AlertDescription>);
    
    const desc = screen.getByTestId("alert-desc");
    expect(desc).toBeDefined();
    expect(desc.className).toContain("text-sm");
  });

  it("renders a complete alert with title and description", () => {
    render(
      <Alert>
        <AlertTitle>Test Title</AlertTitle>
        <AlertDescription>Test Description</AlertDescription>
      </Alert>
    );
    
    expect(screen.getByText("Test Title")).toBeDefined();
    expect(screen.getByText("Test Description")).toBeDefined();
  });
});
