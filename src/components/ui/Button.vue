<template>
	<button :class="classes" v-bind="$attrs">
		<slot />
	</button>
</template>

<script setup lang="ts">
import { type ButtonHTMLAttributes, computed } from "vue";
import { buttonVariants, type ButtonVariants } from "./ButtonVariants";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
	variant?: ButtonVariants["variant"];
	size?: ButtonVariants["size"];
	class?: string;
}

const props = defineProps<Props>();

const classes = computed(() =>
	buttonVariants({ variant: props.variant, size: props.size, class: props.class }),
);
</script>