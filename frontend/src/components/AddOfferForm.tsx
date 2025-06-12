import React, { useState } from 'react';

interface Offer {
  name: string;
  type: string;
  coverage_amount: number;
}

const AddOfferForm: React.FC = () => {
  const [formData, setFormData] = useState<Offer>({
    name: '',
    type: '',
    coverage_amount: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'coverage_amount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8080/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Успешно отправлено:', data);
      alert('Страховое предложение добавлено!');
    } catch (err) {
      console.error('Ошибка при отправке:', err);
      alert('Ошибка при отправке данных.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить страховое предложение</h2>

      <input
        type="text"
        name="name"
        placeholder="Название"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="type"
        placeholder="Тип"
        value={formData.type}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="coverage_amount"
        placeholder="Сумма покрытия"
        value={formData.coverage_amount}
        onChange={handleChange}
        required
      />

      <button type="submit">Добавить</button>
    </form>
  );
};

export default AddOfferForm;
