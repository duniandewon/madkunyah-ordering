import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

import MenuItem from "../MenuItem.vue";

vi.mock("@/utils/formatCurrency", () => ({
  formatCurrency: vi.fn(() => "Rp 25.000"),
}));

describe("MenuCard", () => {
  it("renders available menu information", () => {
    const wrapper = mount(MenuItem, {
      props: {
        menu: {
          id: 1,
          name: "Nasi Goreng",
          description: "Fried rice",
          image: "/nasi.jpg",
          price: 25000,
          category: "nasi",
          isAvailable: true,
        },
        count: 2,
      },
    });

    expect(wrapper.text()).toContain("Nasi Goreng");
    expect(wrapper.text()).toContain("Fried rice");
    expect(wrapper.text()).toContain("Rp 25.000");
    expect(wrapper.text()).toContain("2");

    const img = wrapper.get("img");

    expect(img.attributes("src")).toBe("/nasi.jpg");
    expect(img.attributes("alt")).toBe("Nasi Goreng");
  });

  it("shows out of stock when menu is unavailable", () => {
    const wrapper = mount(MenuItem, {
      props: {
        menu: {
          id: 1,
          name: "Nasi Goreng",
          description: "Fried rice",
          image: "/nasi.jpg",
          price: 25000,
          category: "nasi",
          isAvailable: false,
        },
        count: 0,
      },
    });

    expect(wrapper.text()).toContain("Out of Stock");
    expect(wrapper.text()).not.toContain("Rp 25.000");
  });
});
