<template>
  <div :id="grpupedMenu.category" class="space-y-1 bg-white p-4" data-category>
    <h3 class="text-lg font-bold capitalize">{{ grpupedMenu.category }}</h3>
    <div class="grid space-y-4">
      <RouterLink v-for="menu in grpupedMenu.menus" :key="menu.id" :to="'/menu/' + menu.id"
        :class="!menu.isAvailable && 'pointer-events-none'">
        <MenuItem :count="0" :menu="menu" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import MenuItem from "./MenuItem.vue";
import type { GroupedMenus } from "@/types/menus.ts";

interface Props {
  grpupedMenu: GroupedMenus;
}

const { grpupedMenu } = defineProps<Props>();

</script>