import { describe, it, expect } from "vitest";

import { groupMenusByCategory } from "@/utils/groupMenusByCategory";

describe("groupMenusByCategory", () => {
  it("should group menus by category", () => {
    const menus = [
      {
        id: 1,
        name: "Nasi Goreng",
        price: 25000,
        isAvailable: true,
        category: "Makanan",
      },
      {
        id: 2,
        name: "Mie Goreng",
        price: 22000,
        isAvailable: true,
        category: "Makanan",
      },
      {
        id: 3,
        name: "Es Teh",
        price: 8000,
        isAvailable: true,
        category: "Minuman",
      },
    ];

    const result = groupMenusByCategory(menus);

    expect(result).toEqual([
      {
        category: "Makanan",
        menus: [
          {
            id: 1,
            name: "Nasi Goreng",
            price: 25000,
            isAvailable: true,
            category: "Makanan",
          },
          {
            id: 2,
            name: "Mie Goreng",
            price: 22000,
            isAvailable: true,
            category: "Makanan",
          },
        ],
      },
      {
        category: "Minuman",
        menus: [
          {
            id: 3,
            name: "Es Teh",
            price: 8000,
            isAvailable: true,
            category: "Minuman",
          },
        ],
      },
    ]);
  });

  it("should return an empty array when given an empty list", () => {
    expect(groupMenusByCategory([])).toEqual([]);
  });

  it("should create a single group when all menus share the same category", () => {
    const menus = [
      {
        id: 1,
        name: "Nasi Goreng",
        price: 25000,
        isAvailable: true,
        category: "Makanan",
      },
      {
        id: 2,
        name: "Mie Goreng",
        price: 22000,
        isAvailable: true,
        category: "Makanan",
      },
    ];

    const result = groupMenusByCategory(menus);

    expect(result).toHaveLength(1);
    expect(result[0]?.category).toBe("Makanan");
    expect(result[0]?.menus).toHaveLength(2);
  });
});
