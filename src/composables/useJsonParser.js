import {computed, ref, watch} from "vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';
import {NOTIFICATIONS} from "@/components/Notifications/components/enums.js";
import {useNotification} from "@/composables/useNotification.js";

const jsonData = ref(null);
const allFiles = ref([]);
const allTexts = ref([]);
const inputFileName = ref(null);
const symbolsCount = ref(0);

const filteredData = computed(() => {
    if(jsonData.value.length) {
        return jsonData.value.map(item => item.content)
    } else {
        return jsonData.value
    }
});

export function useJsonParser() {
    const { open } = useNotification()
    const printStrings = item => {
        if (typeof item === 'string') {
            allTexts.value.push(item)
        } else if (item && typeof item === 'object') {
            Object.values(item).forEach(subItem => {
                printStrings(subItem);
            });
        }
    }

    const updateData = ({content, index}) => {
        if (jsonData.value.length) {
            jsonData.value[index].content = content;
        } else {
            const [key, value] = Object.entries(content)[0];
            if (key !== index) {
                jsonData.value[index] = content;
            } else {
                jsonData.value[index] = value;
            }
        }
    }
    const uploadFile = file => {
        const text = Object.values(file);
        text.forEach(item => { printStrings(item) })
        jsonData.value = file;
    }

    const downloadFile = async () => {
        if (jsonData.value.length) {
            const zip = new JSZip();
            await jsonData.value.forEach(({name, content}) => {
                const folder = zip.folder(name)
                folder.file("index.json", JSON.stringify(content))
            })

            zip.generateAsync({ type: 'blob' }).then(function (content) {
                const name = prompt('Введите имя файла')
                FileSaver.saveAs(content, `${name}.zip`);
            })
        } else {
            const data = JSON.stringify(jsonData.value);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'index';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }

    const clearData = () => {
        jsonData.value = null
        allFiles.value = []
        allTexts.value = []
        symbolsCount.value = 0;
        inputFileName.value = null
    }

    return {
        uploadFile,
        updateData,
        jsonData,
        downloadFile,
        filteredData,
        inputFileName,
        symbolsCount,
        allTexts,
        clearData
    }
}
