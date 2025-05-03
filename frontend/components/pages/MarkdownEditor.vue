<template>
    <div class="mdw-container mdw-flex mdw-flex-col mdw-gap-4">
        <!-- Campo para o Markdown -->
        <label class="mdw-font-semibold">Digite seu Markdown:</label>
        <textarea 
            v-model="markdownModel"
            class="mdw-textarea"
            placeholder="Digite seu texto em Markdown..."
        ></textarea>

        <!-- Campo para o CSS -->
        <label class="mdw-font-semibold">Digite seu CSS personalizado:</label>
        <textarea 
            v-model="cssModel"
            class="mdw-textarea"
            placeholder="Digite seu CSS para personalizar o PDF..."
        ></textarea>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    markdown: string;
    css: string;
}>();

const emit = defineEmits(["update:markdown", "update:css"]);

const markdownModel = computed({
    get: () => props.markdown,
    set: (value) => emit("update:markdown", value),
});

const cssModel = computed({
    get: () => props.css,
    set: (value) => emit("update:css", value),
});
</script>
