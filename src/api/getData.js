const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    const error = await res.json();
    throw error;
  } catch (e) {
    console.log(e);
  }
};

const getData = async () => {
  const data = await request('./api/productData.json');
  return data;
};

export default getData;
