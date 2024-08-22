"use client";

import { useEffect, useState } from "react";
import CategoryButton from "@/components/category-button";
import Header from "@/components/header";
import { Category, Product } from "@prisma/client";
import { getCategories, getProductsByCategory } from "@/actions";
import ProductItem from "@/components/product-item";
import Loading from "@/components/loading";

export default function Home() {
  const [loadingProduct, setLoadingProduct] = useState(false);

  const [category, setCategory] = useState<Category[]>([]);

  const [categorySelected, setCategorySelected] = useState({} as Category);

  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    async function loadCategories() {
      const categories = await getCategories();

      setCategory(categories);
      setCategorySelected(categories[0]);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    categorySelected.id && loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySelected]);

  async function loadProducts() {
    setLoadingProduct(true);

    const products = await getProductsByCategory(categorySelected.id);

    setProducts(products);

    setLoadingProduct(false);
  }

  function handleChangeCategory(item: Category) {
    setCategorySelected(item);
  }

  return (
    <div>
      <Header />
      <div className="p-6 flex flex-col gap-7">
        <h1 className="font-base text-base font-semibold">Especialidades</h1>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {category.map((item) => {
            return (
              <CategoryButton
                key={item.id}
                title={item.name}
                action={() => handleChangeCategory(item)}
                selected={categorySelected?.id === item.id}
              />
            );
          })}
        </div>
        {loadingProduct ? (
          <div className="h-96 flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })
        )}
      </div>
    </div>
  );
}
