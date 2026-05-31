import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";

import MenuGroup from "@/components/menus/GroupedMenu.vue";
import type { GroupedMenus } from "@/types/menus";

describe("MenuGroup", () => {
  it("renders category and menu links", () => {
    const groupedMenu: GroupedMenus = {
      category: "Makanan",
      menus: [
        {
          id: 1,
          name: "Nasi Goreng",
          description: "Fried rice",
          image: "/nasi.jpg",
          price: 25000,
          category: "nasi",
          isAvailable: true,
        },
        {
          id: 2,
          name: "Mie Goreng",
          isAvailable: false,
          category: "mie",
          price: 2000,
          description: "Mie goreng",
          image: "/mie.png",
        },
      ],
    };

    const wrapper = mount(MenuGroup, {
      props: {
        grpupedMenu: groupedMenu,
      },
      global: {
        stubs: {
          MenuItem: true,
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Makanan");

    const links = wrapper.findAllComponents(RouterLinkStub);

    expect(links).toHaveLength(2);

    expect(links[0]?.props("to")).toBe("/menu/1");
    expect(links[1]?.props("to")).toBe("/menu/2");

    expect(links[0]?.classes()).not.toContain("pointer-events-none");
    expect(links[1]?.classes()).toContain("pointer-events-none");
  });

  it("sets the category id on the root element", () => {
    const wrapper = mount(MenuGroup, {
      props: {
        grpupedMenu: {
          category: "Minuman",
          menus: [],
        },
      },
      global: {
        stubs: {
          MenuItem: true,
          RouterLink: RouterLinkStub,
        },
      },
    });

    const container = wrapper.get("[data-category]");

    expect(container.attributes("id")).toBe("Minuman");
  });
});
