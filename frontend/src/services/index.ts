export const getMetadata = async (uri: string) => {
    const response = await fetch(uri);
    const data = await response.json();
    return data;
};
