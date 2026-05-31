import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";

import { useScrollspy } from "@/composables/useScrollspy";

describe("useScrollspy", () => {
  const observe = vi.fn();
  const disconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    global.IntersectionObserver = vi.fn().mockImplementation(function () {
      return {
        observe,
        disconnect,
      };
    }) as any;
  });

  it("should observe all matching elements when startWatching is called", () => {
    document.body.innerHTML = `
      <div id="food" data-category></div>
      <div id="drink" data-category></div>
    `;

    const container = document.createElement("div");

    const { startWatching } = useScrollspy(ref(container));

    startWatching();

    expect(global.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledTimes(2);
  });

  it("should set active category and scroll when setActiveManual is called", () => {
    document.body.innerHTML = `
      <div id="food"></div>
    `;

    const element = document.getElementById("food")!;
    element.scrollIntoView = vi.fn();

    const { activeCategory, setActiveManual } = useScrollspy(ref(null));

    setActiveManual("food");

    expect(activeCategory.value).toBe("food");
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  it("should disconnect observer when stopWatching is called", () => {
    const { startWatching, stopWatching } = useScrollspy(ref(null));

    startWatching();
    stopWatching();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
