import { useQuery } from 'react-query';

const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
};

export const useProducts = (params) => {
  return useQuery(['products', params], () => fetchProducts(params));
};

// export async function getProducts(params = {}) {
//   // URLSearchParams을 이용하면 파라미터 값을 자동으로 쉽게 인코딩할 수 있어요.
//   const query = new URLSearchParams(params).toString();

//   try {
//     const response = await fetch(
//       `https://panda-market-api.vercel.app/products?${query}`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const body = await response.json();
//     return body;
//   } catch (error) {
//     console.error("Failed to fetch products:", error);
//     throw error;
//   }
// }

const fetchProductDetail = async (productId) => {
  if (!productId) {
    throw new Error("Invalid product ID");
  }
  const response = await fetch(`https://panda-market-api.vercel.app/products/${productId}`);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
};

export const useProductDetail = (productId) => {
  return useQuery(['productDetail', productId], () => fetchProductDetail(productId), {
    enabled: !!productId, // productId가 존재할 때만 쿼리 실행
  });
};

// export async function getProductDetail(productId) {
//   // Parameter로 넣어줄 상품 아이디가 존재하는지 또는 정상적인지 확인 후에 호출하면 더 안전해요
//   if (!productId) {
//     throw new Error("Invalid product ID");
//   }

//   try {
//     const response = await fetch(
//       `https://panda-market-api.vercel.app/products/${productId}`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const body = await response.json();
//     return body;
//   } catch (error) {
//     console.error("Failed to fetch product detail:", error);
//     throw error;
//   }
// }

const fetchProductComments = async ({ productId, params }) => {
  if (!productId) {
    throw new Error("Invalid product ID");
  }
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`https://panda-market-api.vercel.app/products/${productId}/comments?${query}`);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response.json();
};

export const useProductComments = (productId, params) => {
  return useQuery(['productComments', productId, params], () => fetchProductComments({ productId, params }), {
    enabled: !!productId, // productId가 존재할 때만 쿼리 실행
  });
};

// // 상품 댓글 목록 조회 API에는 path parameter 'productId'와 함께 페이지당 보여줄 댓글 개수를 나타내는 'limit'을 query parameter로 보내주고 있어요.
// export async function getProductComments({ productId, params }) {
//   // Parameter로 넣어줄 상품 아이디가 존재하는지 또는 정상적인지 확인 후에 호출하면 더 안전해요
//   if (!productId) {
//     throw new Error("Invalid product ID");
//   }

//   try {
//     const query = new URLSearchParams(params).toString();
//     const response = await fetch(
//       `https://panda-market-api.vercel.app/products/${productId}/comments?${query}`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const body = await response.json();
//     return body;
//   } catch (error) {
//     console.error("Failed to fetch product comments:", error);
//     throw error;
//   }
// }
