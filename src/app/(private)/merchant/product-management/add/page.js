import React from 'react'
import ProductForm from '../_components/Form';
import { FaArrowLeft } from 'react-icons/fa';
import BackButton from '@/components/BackButton';

const AddProductPage = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <BackButton/>
        <h2 className="my-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
            <ProductForm/>
        </div>
      
    </section>
  )
}

export default AddProductPage;
