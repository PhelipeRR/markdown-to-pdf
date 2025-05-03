<template>
  <button :class="buttonClasses " :disabled="disabled || loading" :aria-disabled="disabled || loading" :type="type"
    @focus="adicionarFocusRing" @blur="removerFocusRing">
    <span v-if="hasAlert" class="mdw-absolute mdw-rounded-full mdw-bg-red-500"
      style="top: -4px; right: -4px; height: 12px; width: 12px;" />
    <div v-if="loading" role="status" aria-hidden="true">
      <div class="spinner-border spinner-border-sm" />
    </div>
    <slot v-if="!loading"></slot>
  </button>
</template>

<script setup lang="ts">

const props = defineProps({
  variant: {
    type: String as PropType<"primary" | "secondary" | "danger" | "success" | "warning" | "outline" | "active">,
    default: "primary",
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "md",
  },
  outline: Boolean,
  ghost: Boolean,
  focusRing: Boolean,
  roundedPill: Boolean,
  rounded: Boolean,
  loading: Boolean,
  hasAlert: Boolean,
  full: Boolean,
  type: {
    type: String as PropType<"button" | "submit">,
    default: "button",
  },
  disabled: Boolean,
});

const buttonClasses = computed(() => [
  "mdw-btn mdw-border mdw-border-gray-300 mdw-text-gray-700 mdw-font-medium mdw-transition-all mdw-duration-300",
  `mdw-btn-${props.size}`,
  props.outline ? "mdw-btn-outline" : `mdw-btn-${props.variant}`,
  props.ghost && "mdw-border-0",
  props.full && "mdw-w-full",
  props.roundedPill ? "mdw-rounded-full" : props.rounded && "mdw-rounded",
  props.disabled && "mdw-opacity-50 mdw-cursor-not-allowed",
  props.loading && "mdw-opacity-50 mdw-cursor-wait",
  props.focusRing && "focus-ring",
]);

/**
 * Adiciona a classe "focus-ring" ao elemento
 * que recebeu o foco, para exibir um anel
 * de destaque.
 */
const adicionarFocusRing = (event: FocusEvent) => {
  (event.target as HTMLElement).classList.add("focus-ring");
};

/**
 * Remove a classe "focus-ring" do elemento
 * que perdeu o foco, para esconder o anel
 * de destaque.
 */
const removerFocusRing = (event: FocusEvent) => {
  (event.target as HTMLElement).classList.remove("focus-ring");
};
</script>