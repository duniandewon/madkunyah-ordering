import { describe, it, expect, vi, beforeEach } from "vitest";
import type { AxiosInstance } from "axios";

import { getMenus } from "@/api/menus/getMenus";
import { groupMenusByCategory } from "@/utils/groupMenusByCategory";

vi.mock("@/utils/groupMenusByCategory", () => ({
  groupMenusByCategory: vi.fn(),
}));

describe("getMenus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch menus, group them, and return the result on success", async () => {
    const mockRawMenus = [{ id: 1, name: "Nasi Goreng" }];

    const mockGroupedMenus = [
      {
        category: "Makanan",
        menus: mockRawMenus,
      },
    ];

    vi.mocked(groupMenusByCategory).mockReturnValue(mockGroupedMenus as any);

    const mockAxiosClient = {
      get: vi.fn().mockResolvedValue({
        data: {
          success: true,
          message: "Success",
          responseObject: mockRawMenus,
        },
      }),
    } as Partial<AxiosInstance> as AxiosInstance;

    const result = await getMenus(mockAxiosClient)();

    expect(mockAxiosClient.get).toHaveBeenCalledTimes(1);
    expect(mockAxiosClient.get).toHaveBeenCalledWith("/menus");

    expect(groupMenusByCategory).toHaveBeenCalledTimes(1);
    expect(groupMenusByCategory).toHaveBeenCalledWith(mockRawMenus);

    expect(result).toBe(mockGroupedMenus);
  });

  it("should throw an error if the API returns success: false", async () => {
    const mockAxiosClient = {
      get: vi.fn().mockResolvedValue({
        data: {
          success: false,
          message: "Database connection failed",
          responseObject: null,
        },
      }),
    } as Partial<AxiosInstance> as AxiosInstance;

    await expect(getMenus(mockAxiosClient)()).rejects.toThrow(
      "Database connection failed",
    );

    expect(groupMenusByCategory).not.toHaveBeenCalled();
  });

  it("should propagate network errors directly from Axios", async () => {
    const networkError = new Error("Network timeout");

    const mockAxiosClient = {
      get: vi.fn().mockRejectedValue(networkError),
    } as Partial<AxiosInstance> as AxiosInstance;

    await expect(getMenus(mockAxiosClient)()).rejects.toThrow(
      "Network timeout",
    );

    expect(groupMenusByCategory).not.toHaveBeenCalled();
  });
});
