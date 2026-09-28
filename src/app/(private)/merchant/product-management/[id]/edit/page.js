import React from 'react'
import ProductForm from '../../_components/Form';
import { getProductById } from '@/api/products';
import BackButton from '@/components/BackButton';

const EditProductPage = async({params}) => {
    const {id}= await params;

    const product = await getProductById(id);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <BackButton/>
        <h2 className="my-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit ProductPage
        </h2>
            <ProductForm product={product} isEditing={true}/>
        </div>
      
    </section>
  )
}

export default EditProductPage;
