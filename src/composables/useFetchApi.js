import {ref} from "vue";
import {API} from "@/api/index.js";

const loaders = ref({
    upload: false
})
export function useFetchApi() {
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

    return {
        loaders,
        getFileEntries,
        getData
    }
}
