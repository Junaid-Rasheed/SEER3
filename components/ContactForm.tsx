import React, { ChangeEvent, FormEvent, useState } from 'react';

export default function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.persist();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Success!');
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs mb-2"
            htmlFor="grid-first-name"
          >
            Name
          </label>
          <input
            className="block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded-none"
            name="name"
            type="text"
            placeholder="NAME"
            value={values.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-white text-xs mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none rounded-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="email"
            type="email"
            placeholder="EMAIL"
            value={values.email}
            onChange={handleInputChange}

            required
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-xs mb-2 text-white"
            htmlFor="grid-password"
          >
            Message
          </label>
          <textarea
            className="no-resize rounded-none appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-[100px] resize-none"
            name="message"
            placeholder="MESSAGE"
            value={values.message}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="w-full">
        <button
          className="w-full shadow bg-decode3 focus:shadow-outline focus:outline-none text-sm md:text-md font-bold py-4 px-4"
          type="submit"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
}

