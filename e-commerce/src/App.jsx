import React, { useState } from 'react';

const productData = {
  title: 'Tênis Esportivo XYZ',
  price: 249.90,
  images: [
    'https://varejaodotenis.com.br/wp-content/uploads/2024/12/Tenis-Nike-Zoom-x3.jpg',
    'https://images.tcdn.com.br/img/img_prod/1309938/nike_dunk_low_cinza_preto_1021_1_c93ccf815c8710b016712926d352a29e.png',
    'https://varejaodotenis.com.br/wp-content/uploads/2024/12/NIke-Zoom-x-premium2.jpg',
  ],
  variants: {
    sizes: ['37', '38', '39', '40', '41'],
    colors: ['Preto', 'Branco', 'Vermelho'],
  },
};

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(productData.images[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCepSearch = async () => {
    if (cep.length !== 8) return;
    setLoading(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setAddress('CEP não encontrado');
      } else {
        setAddress(`${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`);
      }
    } catch {
      setAddress('Erro ao buscar o CEP');
    }
    setLoading(false);
  };

  return (
   <div className="h-screen flex justify-center items-center bg-amber-600">
  <div className="max-w-5xl w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg">
    {/* Imagens */}
    <div>
      <img
        src={selectedImage}
        alt="Produto"
        className="w-full h-[400px] object-cover rounded-lg shadow-md"
      />
      <div className="flex gap-2 mt-4">
        {productData.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Miniatura ${index + 1}`}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${
              selectedImage === img ? 'border-blue-500' : 'border-gray-300'
            }`}
          />
        ))}
      </div>
    </div>

    {/* Detalhes */}
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">{productData.title}</h1>
      <p className="text-xl font-bold text-green-600">R$ {productData.price.toFixed(2)}</p>

      {/* Tamanhos */}
      <div>
        <h2 className="font-medium mb-1">Tamanho:</h2>
        <div className="flex gap-2">
          {productData.variants.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded ${
                selectedSize === size ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Cores */}
      <div>
        <h2 className="font-medium mb-1">Cor:</h2>
        <div className="flex gap-2">
          {productData.variants.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded ${
                selectedColor === color ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Verificação de CEP */}
      <div className="mt-4">
        <label className="block mb-1 font-medium">Digite seu CEP:</label>
        <div className="flex gap-2">
          <input
            type="text"
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
            className="border p-2 rounded w-40"
            placeholder="Ex: 12345678"
          />
          <button
            onClick={handleCepSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
        </div>
        {loading && <p className="text-sm mt-2 text-gray-500">Buscando endereço...</p>}
        {address && <p className="mt-2 text-sm text-gray-800">{address}</p>}
      </div>
    </div>
  </div>
</div>

  );
}
