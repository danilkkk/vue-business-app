import {
    computed,
    watch
} from "vue";
import {
    useField,
    useForm,
    useform
} from "vee-validate";
import * as yup from "yup";
import {
    useStore
} from 'vuex'
import {
    useRouter
} from 'vue-router'

export function useLoginForm() {
    const router = useRouter();
    const store = useStore();
    const {
        handleSubmit,
        isSubmitting,
        submitCount
    } = useForm();

    /** регистрация и валидация моделей элементов формы*/
    const {
        value: email,
        errorMessage: emailError,
        handleBlur: emailBlur,
    } = useField(
        "email",
        yup
        .string()
        .trim()
        .required("Поле не должно быть пустым")
        .email("Введите корректный адрес электронной почты")
    );

    const MIN_PASSWORD_LENGTH = 6;

    const {
        value: password,
        errorMessage: passwordError,
        handleBlur: passwordBlur,
    } = useField(
        "password",
        yup
        .string()
        .trim()
        .required("Поле не должно быть пустым")
        .min(
            MIN_PASSWORD_LENGTH,
            `Пароль должен содержать не меньше ${MIN_PASSWORD_LENGTH} символов`
        )
    );

    const ExceededTheNumbOfLoginAttempts = computed(
        () => submitCount.value >= 10
    );

    watch(ExceededTheNumbOfLoginAttempts, (value) => {
        if (value) {
            setTimeout(() => (submitCount.value = 0), 3000);
        }
    });

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('auth/login', values);
            router.push('/');
        } catch (e) {

        }
    });

    return {
        email,
        emailError,
        emailBlur,
        password,
        passwordError,
        passwordBlur,
        onSubmit,
        isSubmitting,
        ExceededTheNumbOfLoginAttempts,
    };
}