import {handleFormRequest} from "@/utils/formRequrest.js";
import {API} from "@/api/index.js";
import {ref} from "vue";
import {useRouter} from "vue-router";

const loading = ref(false)

const setLoading = state => loading.value = state

const user = ref({
    email: null,
    isAuth: false,
    created_at: null
})

export function useAuthorization() {
    const router = useRouter()
    const login = (payload, form) => {
        const onSuccess = data => {
            console.log(data,' 1221213')
            localStorage.setItem('token', data.token);
            user.value.isAuth = true;
            router.push({name: 'dashboard'})
        }

        return handleFormRequest(API.auth.LOGIN, payload, onSuccess, form, setLoading);
    }

    return { login, loading, user };
}
