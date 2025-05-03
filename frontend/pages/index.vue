<template>
    <div class="mdw-container mdw-max-w-4xl mdw-mx-auto mdw-py-8">
        <h1 class="mdw-text-2xl mdw-font-bold mdw-text-center mdw-mb-6">Conversor de Markdown para PDF</h1>

        <!-- Editores de Markdown e CSS -->
        <div class="mdw-grid mdw-grid-cols-1 mdw-md:grid-cols-2 mdw-gap-4">
            <MarkdownEditor :markdown="markdownText" :css="cssText" @update:css="cssText = $event"
                @update:markdown="markdownText = $event" />

        </div>

        <!-- Pré-visualização -->
        <PDFViewer v-if="pdfUrl" :pdf-url="pdfUrl" @close="closePDFViewer" />

        <div class="mdw-flex mdw-mt-2.5 mdw-ml-4 mdw-gap-4">
            <div>
                <label for="name">Nome PDF:</label>
                <input type="text" v-model="name" id="name"
                    class="mdw-w-full mdw-py-2 mdw-px-4 mdw-rounded-lg mdw-border mdw-border-gray-300">
            </div>
            <!-- Botão para Converter -->
            <div class="mdw-mt-6">
                <ButtonsComponent @click="convertToPDF" :disabled="isLoading">
                    {{ isLoading ? "Gerando PDF..." : "Converter para PDF" }}
                </ButtonsComponent>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MarkdownEditor from "../components/pages/MarkdownEditor.vue";
import PDFViewer from "../components/pages/PDFViewer.vue";
import ButtonsComponent from "../components/base/ButtonComponent.vue"
import { api } from '../api'

const name = ref<string>("");
const markdownText = ref<string>("");
const cssText = ref<string>(`/* You can add some CSS styles too, if you want. */

h1, h2 {
    color: MidnightBlue;
}

table {
  border-collapse: collapse;
}

table, th, td {
  border: 1px solid DimGray;
}

th, td {
  text-align: left;
  padding: 1em;
}
`);

const isLoading = ref<boolean>(false);
const pdfUrl = ref<string>("");

/**
 * Converte o texto em Markdown e CSS para um PDF.
 * Chama a API com o texto em Markdown e CSS, e
 * armazena a URL do blob gerado na variável `pdfUrl`.
 * Mostra um alerta se houver um erro.
 * @returns {Promise<void>}
 */
 const convertToPDF = async () => {
    isLoading.value = true;
    try {
        const response = await api.convertMarkdownToPDF(markdownText.value, cssText.value, name.value);

        if (!response.base64) {
            throw new Error("Resposta inválida da API");
        }

        const blob = base64ToBlob(response.base64, "application/pdf");

        // Cria a URL do objeto Blob
        pdfUrl.value = URL.createObjectURL(blob);

        console.log("PDF gerado:", pdfUrl.value);
    } catch (error) {
        alert("Erro ao gerar PDF. Tente novamente.");
    } finally {
        isLoading.value = false;
    }
};



/**
 * Fecha o visor de PDF e remove a URL do objeto.
 */
const closePDFViewer = () => {
    URL.revokeObjectURL(pdfUrl.value);
    pdfUrl.value = "";
};

/**
 * Converte um string base64 para um blob.
 * @param {string} base64 String em base64.
 * @param {string} mimeType Tipo de mídia do blob.
 * @returns {Blob} Blob com o conteúdo convertido.
 */
const base64ToBlob = (base64: string, mimeType: string) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: mimeType });
};
</script>
