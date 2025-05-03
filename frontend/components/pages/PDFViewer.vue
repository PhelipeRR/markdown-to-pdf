<template>
    <div class="mdw-fixed mdw-inset-0 mdw-bg-black mdw-bg-opacity-50 mdw-flex mdw-items-center mdw-justify-center">
        <div class="mdw-bg-white mdw-rounded-lg mdw-shadow-lg mdw-w-3/4 mdw-h-3/4 mdw-relative mdw-flex mdw-flex-col">
            <!-- Cabeçalho do Modal -->
            <div class="mdw-flex mdw-justify-between mdw-items-center mdw-p-4 mdw-border-b">
                <h2 class="mdw-text-lg mdw-font-semibold">Visualização do PDF</h2>
                <button @click="emitClose" class="mdw-text-red-600 mdw-text-lg mdw-font-bold">
                    ✖
                </button>
            </div>

            <!-- PDF Embed -->
            <embed :src="pdfUrl" type="application/pdf" class="mdw-flex-1 mdw-w-full mdw-h-full" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ pdfUrl: string }>();

const emit = defineEmits(["close"]);

const emitClose = () => {
    emit("close");
};
</script>
