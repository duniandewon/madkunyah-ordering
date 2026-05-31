import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createMemoryHistory } from "vue-router";
import App from "../App.vue";
// Import the actual component that contains the "Menus" text
import HomeView from "@/screens/Home.vue";

const mockRouter = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: "/", component: HomeView }],
});

describe("App", () => {
  it("mounts renders properly", async () => {
    mockRouter.push("/");
    await mockRouter.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [mockRouter],
      },
    });

    expect(wrapper.text()).toContain("Menus");
  });
});
