import {
    useField,
    useForm
} from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm(submit) {
    const {
        isSubmitting,
        handleSubmit
    } = useForm({
        initialValues: {
            status: 'active',
        }
    });

    const {
        value: name,
        errorMessage: nameError,
        handleBlur: nameBlur
    } = useField(
        'name',
        yup.string()
        .trim()
        .required('Необходимо указать ФИО')
    );
    const {
        value: phone,
        errorMessage: phoneError,
        handleBlur: phoneBlur
    } = useField(
        'phone',
        yup.string()
        .trim()
        .required('Необходимо указать телефон')
    );
    const {
        value: amount,
        errorMessage: amountError,
        handleBlur: amountBlur
    } = useField(
        'amount',
        yup.number('Сумма должна быть числом')
        .required('Необходимо указать сумму')
        .min(0, 'Сумма не может быть меньше нуля'));
    const {
        value: status
    } = useField('status');


    const onSubmit = handleSubmit(submit);

    return {
        name,
        nameError,
        nameBlur,
        phone,
        phoneError,
        phoneBlur,
        amount,
        amountError,
        amountBlur,
        status,
        isSubmitting,
        onSubmit
        }
}