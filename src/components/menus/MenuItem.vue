<template>
  <div class="flex gap-3">
    <div class="w-24 h-24 rounded-2xl overflow-hidden">
      <img :src="menu.image" :alt="menu.name" class="w-full h-full object-cover" />
    </div>
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ menu.name }}</h3>
      <p class="line-clamp-2">{{ menu.description }}</p>
      <p class="text-primary font-bold mt-2" v-if="menu.isAvailable">{{ formatCurrency(menu.price) }}</p>
      <p class="text-destructive font-bold" v-else>Out of Stock</p>
    </div>
    <div class="flex flex-col">
      <!-- <Icon name="uil:heart" class="text-2xl" /> -->
      <div v-if="menu.isAvailable"
        class="w-7 h-7 rounded-full bg-primary text-primary-foreground flex mt-auto items-center justify-center">
        <p class="text-center text-sm font-medium" v-if="count > 0">{{ count }}</p>
        <Plus class="text-primary-foreground" v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from "@/types/menus";
import { formatCurrency } from "@/utils/formatCurrency";
import { Plus } from "@lucide/vue";

interface Props {
  menu: Menu;
  count: number;
}

const { menu, count } = defineProps<Props>();
</script>