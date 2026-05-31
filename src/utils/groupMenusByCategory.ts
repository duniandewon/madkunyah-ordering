import type { MenuDto } from "@/api/menus/entities";
import type { GroupedMenus } from "@/types/menus";

export function groupMenusByCategory(menus: MenuDto[]): GroupedMenus[] {
  const grouped = menus.reduce<Record<string, MenuDto[]>>((acc, menu) => {
    if (!acc[menu.category]) {
      acc[menu.category] = [];
    }

    acc[menu.category]?.push(menu);
    return acc;
  }, {});

  return Object.entries(grouped).map(([category, menus]) => ({
    category,
    menus,
  }));
}
