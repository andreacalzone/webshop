import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/features/products/productsSlice'
import { ProductList } from '../components/ProductList'

const HomePage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const { products, error, loading } = useSelector(state => state.productList)

    if (error) {
        return (
            <div className='mt-10'>
                <p className="text-red-500">{ error }</p>
            </div>
        )
    }

  return (
    <div className="mt-10">
        {
            loading
            ? <ProductList.Skeleton />
            : <ProductList products={products} />
        }
    </div>
  )
}

export default HomePage