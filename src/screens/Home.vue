<script setup lang="ts">
import DefaultLayout from '@/components/layout/DefaultLayout.vue';
import GroupedMenu from '@/components/menus/GroupedMenu.vue';
import Button from '@/components/ui/Button.vue';
import { useMenus } from '@/composables/useMenus';
import { useScrollspy } from '@/composables/useScrollspy';
import { nextTick, ref, watch } from 'vue';

const scrollContainer = ref<HTMLElement | null>(null);
const tabsContainer = ref<HTMLElement | null>(null);

const { menus, isPending } = useMenus()

const { activeCategory, startWatching, setActiveManual } = useScrollspy(scrollContainer);

const handleCategoryClick = (id: string) => {
  setActiveManual(id);
};

watch(
  () => menus.value,
  async (newData) => {
    if (newData && newData.length > 0) {
      await nextTick();

      if (!activeCategory.value) {
        activeCategory.value = newData[0]?.category;
      }

      startWatching();
    }
  },
  { immediate: true },
);

watch(activeCategory, async (newCategory) => {
  await nextTick();
  const activeTab = document.getElementById(`category-${newCategory}`);
  if (activeTab && tabsContainer.value) {
    activeTab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }
});
</script>

<template>
  <DefaultLayout>
    <template #title>
      <h1 class="text-xl font-bold">Menus</h1>
    </template>

    <div v-if="isPending">
      <p>Loading...</p>
    </div>

    <div class="grid grid-rows-[auto_1fr] min-h-0" v-if="!isPending && menus">
      <div class="flex gap-2 overflow-x-auto bg-white px-4 pb-4" ref="tabsContainer">
        <Button v-for="category in menus" :key="category.category"
          :variant="activeCategory === category.category ? 'default' : 'outline'" :id="`category-${category.category}`"
          size="sm" @click="handleCategoryClick(category.category)" class="capitalize">
          {{ category.category }}
        </Button>
      </div>

      <div class="space-y-2 overflow-y-auto pb-2" ref="scrollContainer">
        <GroupedMenu :grpuped-menu="menu" v-for="menu in menus" :key="`menu-${menu.category}`" />
      </div>
    </div>
  </DefaultLayout>
</template>