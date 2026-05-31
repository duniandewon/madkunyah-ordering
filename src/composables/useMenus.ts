import { getMenus } from "@/api/menus/getMenus";
import type { GroupedMenus } from "@/types/menus";
import { useQuery } from "@tanstack/vue-query";

export function useMenus() {
  const { isPending, isError, data, error } = useQuery<GroupedMenus[]>({
    queryKey: ["menus"],
    queryFn: getMenus(),
  });

  return {
    menus: data,
    isPending,
    isError,
    error,
  };
}
