import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { ref } from "vue";

import MenusScreen from "@/screens/Home.vue";

import { useMenus } from "@/composables/useMenus";
import { useScrollspy } from "@/composables/useScrollspy";

vi.mock("@/composables/useMenus");
vi.mock("@/composables/useScrollspy");

describe("MenusView", () => {
  const startWatching = vi.fn();
  const setActiveManual = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useScrollspy).mockReturnValue({
      activeCategory: ref("food"),
      startWatching,
      stopWatching: vi.fn(),
      setActiveManual,
    });
  });

  it("shows loading state", () => {
    vi.mocked(useMenus).mockReturnValue({
      menus: ref(undefined),
      isPending: ref(true),
      isError: ref(false),
      error: ref(null),
    });

    const wrapper = mount(MenusScreen, {
      global: {
        stubs: {
          DefaultLayout: {
            template: "<div><slot /><slot name='title' /></div>",
          },
          Button: true,
          GroupedMenu: true,
        },
      },
    });

    expect(wrapper.text()).toContain("Loading...");
  });

  it("renders categories when menus are loaded", () => {
    vi.mocked(useMenus).mockReturnValue({
      menus: ref([
        {
          category: "food",
          menus: [],
        },
        {
          category: "drink",
          menus: [],
        },
      ]),
      isPending: ref(false),
      isError: ref(false),
      error: ref(null),
    });

    const wrapper = mount(MenusScreen, {
      global: {
        stubs: {
          DefaultLayout: {
            template: "<div><slot /><slot name='title' /></div>",
          },
          Button: {
            template: "<button><slot /></button>",
            props: ["id", "variant", "size"],
          },
          GroupedMenu: true,
        },
      },
    });

    expect(wrapper.text()).toContain("food");
    expect(wrapper.text()).toContain("drink");
  });

  it("calls setActiveManual when category button is clicked", async () => {
    vi.mocked(useMenus).mockReturnValue({
      menus: ref([
        {
          category: "food",
          menus: [],
        },
      ]),
      isPending: ref(false),
      isError: ref(false),
      error: ref(null),
    });

    const wrapper = mount(MenusScreen, {
      global: {
        stubs: {
          DefaultLayout: {
            template: "<div><slot /><slot name='title' /></div>",
          },
          Button: {
            template: "<button @click='$emit(`click`)'><slot /></button>",
            props: ["id", "variant", "size"],
          },
          GroupedMenu: true,
        },
      },
    });

    await wrapper.find("button").trigger("click");

    expect(setActiveManual).toHaveBeenCalledWith("food");
  });

  it("starts watching when menus are loaded", async () => {
    vi.mocked(useMenus).mockReturnValue({
      menus: ref([
        {
          category: "food",
          menus: [],
        },
      ]),
      isPending: ref(false),
      isError: ref(false),
      error: ref(null),
    });

    mount(MenusScreen, {
      global: {
        stubs: {
          DefaultLayout: {
            template: "<div><slot /><slot name='title' /></div>",
          },
          Button: true,
          GroupedMenu: true,
        },
      },
    });

    await Promise.resolve();

    expect(startWatching).toHaveBeenCalled();
  });
});
