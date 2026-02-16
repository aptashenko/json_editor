import { ref } from "vue";
import { API } from "@/api/index.js";
import { useJsonParser } from "./useJsonParser";
import { useNotification } from "./useNotification";
import { NOTIFICATIONS } from "@/components/Notifications/components/enums";

const loaders = ref({
    upload: false,
    ai_translation: false
})

export function useFetchApi() {
    const { jsonData } = useJsonParser();
    const { open } = useNotification()

    const getFileEntries = async (payload) => {
        loaders.value.upload = true;
        try {
            const { data, status } = await API.general.upload(payload, {'Content-type': 'multipart/form-data'})

            if (status === 200 || status === 201) {
                return data.data
            }
        } catch (error) {
            console.error(error)
        } finally {
            loaders.value.upload = false
        }
    }

    const getData = async () => {
        const { data } = await API.general.get();
        console.log(data)
    }

    const getAITranslation = async () => {   
        if(loaders.value.ai_translation) return        
        loaders.value.ai_translation = true;
        
        try {
            const sortedJson =  jsonData.value.reduce((acc, textSection) => {
                if (textSection.name !== 'legal') acc[textSection.name] = textSection.content;
                return acc;
            }, {});   
            const targetLanguage = prompt('Enter the target language for translation (e.g., English, Spanish, Russian).')
            
            // Валидация длинны текста
            if (JSON.stringify(sortedJson).length > 12000) {
                open(NOTIFICATIONS.error, {
                    title: "OOps! File is too big :(",
                    text: "AI can't handle with that many characters."
                })
                
                return
            }  
            // Валидация названия языка  
            if(!targetLanguage && targetLanguage < 4) return     

            const payload = {
                user_text: sortedJson,
                target_language: targetLanguage
            }

            const {data: translatedJson} = await API.general.get_ai_translation(payload)
            const validTranslation = translatedJson.replace(/^```json\n|```$/g, ''); // Убираем лишние символы, если ИИ их забыл убрать
            const parsedTranslation = JSON.parse(validTranslation); // Нужно парсить потому что приходит в ответ JSON объект, который еще раз был конвертирован в JSON для запроса
    
            
            jsonData.value.forEach((textSection, key) => {        
                if (parsedTranslation[textSection.name]) {
                    textSection.content = parsedTranslation[textSection.name];
                }
            });
            
            open(NOTIFICATIONS.success, {
                title: "Texts have been successfully translated.",
                text: "Dont forget to check new texts! AI can make mistakes."
            })        
        } catch (error) {
            console.error(error)
        } finally {
            loaders.value.ai_translation = false
        }
    }


    return {
        loaders,
        getFileEntries,
        getData,
        getAITranslation
    }
}

