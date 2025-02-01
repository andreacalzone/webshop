import axios from 'axios'

const getAll = async () => {
    const res = await axios.get('https://js2-ecommerce-api.vercel.app/api/products')
    return res.data
}

export default {
    getAll
}