import {computed, ref, watch} from "vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';
import {NOTIFICATIONS} from "@/components/Notifications/components/enums.js";
import {useNotification} from "@/composables/useNotification.js";

const fileName = ref(null)
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
        if (file) {
            const reader = new FileReader();

            if (file.type.includes('json')) {

                reader.onload = function(e) {
                    const content = e.target.result;
                    try {
                        const parsedContent = JSON.parse(content);
                        const text = Object.values(parsedContent);
                        text.forEach(item => { printStrings(item) })
                        fileName.value = file.name;
                        jsonData.value = parsedContent;
                    } catch (err) {
                        alert('ERROR! Parsing error or the file is corrupted:')
                        console.error('Parsing error or file is broken:', err);
                    }
                };
                reader.readAsText(file);
            } else if (file.type.includes('zip')) {
                reader.onload = function(ev) {
                    const zip = new JSZip();
                    zip.loadAsync(ev.target.result).then(function(contents) {
                        contents.forEach(function (relativePath, zipEntry) {
                            console.log(relativePath, zipEntry)
                            if (zipEntry.name.endsWith('index.json')) {
                                zipEntry.async("string").then(function(data) {
                                    const fileName = zipEntry.name.split('/')[1].replace('.json', '');
                                    const object = {
                                        name: fileName,
                                        content: JSON.parse(data)
                                    }
                                    const text = Object.values(object.content);
                                    text.forEach(item => { printStrings(item) })
                                    allFiles.value.push(object)
                                });
                            }
                        });
                    });
                    jsonData.value = allFiles.value;
                };
                reader.readAsArrayBuffer(file);
            } else {
                open(NOTIFICATIONS.error, {
                    title: 'Error',
                    text: 'Parsing error or the file is corrupted',
                });
                clearData()
            }

        }
    }

    const downloadFile = async () => {

        if (jsonData.value.length) {
            const zip = new JSZip();
            await jsonData.value.forEach(item => {
                const content = JSON.stringify(item.content);
                const name = item.name;
                const folder = zip.folder(name)
                folder.file("index.json", content)
            })

            zip.generateAsync({ type: 'blob' }).then(function (content) {
                const name = prompt('Введите имя файла')
                FileSaver.saveAs(content, `${name}.zip`);
            });
        } else if (typeof jsonData.value === 'object') {
            const data = JSON.stringify(jsonData.value);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName.value;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            alert('ERROR')
        }
    }

    const symbolsCounter = () => {
        const regexTags = /<[^>]*>/g;
        const regexBracketsContent = /\{[^{}]*\}/g;
        const regexPunctuation = /[^\p{L}]/gu;

        allTexts.value.forEach(string => {
            if (string) {
                const onlyText = string.replaceAll(regexTags, '');
                const withoutBrackets = onlyText.replaceAll(regexBracketsContent, '');
                const withoutPunctuation = withoutBrackets.replaceAll(regexPunctuation, '');
                const onlyTextsLength = withoutPunctuation.length;
                symbolsCount.value += onlyTextsLength;
            }
        })
    }

    const clearData = () => {
        fileName.value = null
        jsonData.value = null
        allFiles.value = []
        allTexts.value = []
        symbolsCount.value = 0;
        inputFileName.value = null
    }

    watch(allTexts, symbolsCounter, {deep: true})


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
