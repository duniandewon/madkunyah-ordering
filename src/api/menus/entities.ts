export interface MenuDto {
  id: number;
  name: string;
  image?: string;
  price: number;
  description?: string;
  isAvailable: boolean;
  category: string;
}

export interface ModifierItemDto {
  id: number;
  name: string;
  price: number;
}

export interface ModifierGroupDto {
  id: number;
  name: string;
  type: string;
  min_select: number;
  max_select: number;
  items: ModifierItemDto[];
}

export interface MenuDetailsDto {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  modifier_groups: ModifierGroupDto[];
}
