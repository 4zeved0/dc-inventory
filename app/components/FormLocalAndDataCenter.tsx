'use client'

import { FormEvent } from 'react';

function FormLocalAndDataCenter() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
  };

  return (
    <form className="flex gap-5 mt-5" onSubmit={handleSubmit}>
      <div>
        <select name="locale" className="p-2 border border-slate-300 rounded" required>
          <option value="sp2">SP-2</option>
          <option value="sp3">SP-3</option>
          <option value="rj1">RJ-1</option>
        </select>
      </div>
      <div>
        <select name="datacenter" className="p-2 border border-slate-300 rounded" required>
          <option value="dc1">Datacenter 1</option>
          <option value="dc3">Datacenter 3</option>
        </select>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Enviar</button>
    </form>
  );
}

export default FormLocalAndDataCenter;
