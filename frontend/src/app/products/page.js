export const metadata = { title: "ROH Products" };

import ProductsPageClient from "./ProductsPageClient";

export default function ProductsPage() {
  /** Server component: no hooks here */
  return <ProductsPageClient />;
}
