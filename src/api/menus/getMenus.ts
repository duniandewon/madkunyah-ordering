import { axios } from "@/config/http-client";
import type { ServiceResponse } from "@/utils/responses";
import type { AxiosInstance } from "axios";
import type { MenuDto } from "./entities";
import type { GroupedMenus } from "@/types/menus";
import { groupMenusByCategory } from "@/utils/groupMenusByCategory";

export const getMenus =
  (client: AxiosInstance = axios) =>
  async (): Promise<GroupedMenus[]> => {
    const { data } = await client.get<ServiceResponse<MenuDto[]>>("/menus");

    if (!data.success) {
      throw new Error(data.message);
    }

    return groupMenusByCategory(data.responseObject);
  };
