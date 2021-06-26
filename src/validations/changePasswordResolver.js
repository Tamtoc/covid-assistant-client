import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    password: yup.string().required("Debes ingresar un password").min(6, "El password debe tener al menos 6 carácteres")
})

export default yupResolver( schema )