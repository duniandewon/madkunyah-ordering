<template>
  <div class="h-dvh grid grid-rows-[auto_1fr_auto] overflow-hidden bg-background">
    <header class="flex items-center p-4 bg-white">
      <Button v-if="props.showBackButton" type="button" variant="ghost" size="icon" @click="handleClickBack">
        <ArrowLeft />
      </Button>
      <div class="flex-1">
        <slot name="title" />
      </div>
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </header>

    <main class="overflow-hidden grid">
      <slot />
    </main>

    <footer v-if="$slots.footer" class="grid p-4 bg-white">
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue";
import { useRouter } from "vue-router";
import Button from "../ui/Button.vue";

const router = useRouter();

const props = defineProps<{
	showBackButton?: boolean;
}>();

const handleClickBack = () => router.back();
</script>