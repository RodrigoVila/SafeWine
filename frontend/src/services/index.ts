export const getProductImage = async (uri: string) => {
  const response = await fetch(uri);
  const data = await response.json();
  return data.fileURI;
};
