import { describe, it, expect } from "bun:test";
import { render, screen } from "@testing-library/react";
import * as React from "react";
import { Badge } from "../../../../src/components/ui/badge";

describe("Badge", () => {
  it("renders with default variant", () => {
    render(<Badge data-testid="badge">Default Badge</Badge>);
    
    const badge = screen.getByTestId("badge");
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe("Default Badge");
    expect(badge.className).toContain("bg-primary");
  });

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary Badge</Badge>);
    
    const badge = screen.getByTestId("badge");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-secondary");
  });

  it("renders with destructive variant", () => {
    render(<Badge variant="destructive" data-testid="badge">Destructive Badge</Badge>);
    
    const badge = screen.getByTestId("badge");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-destructive");
  });

  it("renders with success variant", () => {
    render(<Badge variant="success" data-testid="badge">Success Badge</Badge>);
    
    const badge = screen.getByTestId("badge");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-green-500");
  });

  it("renders with outline variant", () => {
    render(<Badge variant="outline" data-testid="badge">Outline Badge</Badge>);
    
    const badge = screen.getByTestId("badge");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("text-foreground");
    // Outline variant doesn't have bg-* class
    expect(badge.className).not.toContain("bg-primary");
  });

  it("renders with static variants", () => {
    render(<Badge variant="default-static" data-testid="badge">Static Badge</Badge>);
    
    const badge = screen.getByTestId("badge");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("bg-primary");
    expect(badge.className).not.toContain("hover:bg-primary");
  });

  it("applies custom className", () => {
    render(
      <Badge className="test-custom-class" data-testid="badge">
        Custom Class Badge
      </Badge>
    );
    
    const badge = screen.getByTestId("badge");
    expect(badge.className).toContain("test-custom-class");
  });
});
