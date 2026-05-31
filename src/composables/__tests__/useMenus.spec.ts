import { describe, it, expect, vi, beforeEach } from "vitest";
import { ref } from "vue";

import { useMenus } from "@/composables/useMenus";
import { useQuery } from "@tanstack/vue-query";
import { getMenus } from "@/api/menus/getMenus";

vi.mock("@tanstack/vue-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("@/api/menus/getMenus", () => ({
  getMenus: vi.fn(),
}));

describe("useMenus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call useQuery with the correct configuration", () => {
    const queryFn = vi.fn();

    vi.mocked(getMenus).mockReturnValue(queryFn);

    vi.mocked(useQuery).mockReturnValue({
      isPending: ref(false),
      isError: ref(false),
      data: ref([]),
      error: ref(null),
    } as any);

    useMenus();

    expect(getMenus).toHaveBeenCalledTimes(1);

    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ["menus"],
      queryFn,
    });
  });

  it("should expose the values returned by useQuery", () => {
    const isPending = ref(true);
    const isError = ref(false);
    const data = ref([
      {
        category: "Makanan",
        menus: [],
      },
    ]);
    const error = ref(null);

    vi.mocked(getMenus).mockReturnValue(vi.fn());

    vi.mocked(useQuery).mockReturnValue({
      isPending,
      isError,
      data,
      error,
    } as any);

    const result = useMenus();

    expect(result.menus).toBe(data);
    expect(result.isPending).toBe(isPending);
    expect(result.isError).toBe(isError);
    expect(result.error).toBe(error);
  });
});
