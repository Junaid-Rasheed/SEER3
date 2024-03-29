import React, { ReactElement, useState } from 'react';
import PublicLayout from '../components/layouts/PublicLayout';
import Image from 'next/image';
import ContactForm from '../components/ContactForm';
import { fetchPostJSON } from '../utils/api-helpers';
import { ContactType } from '../model/common';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [loading, setLoading] = useState(false);
  async function handleSendEmail(value: ContactType, onSuccess?: () => void) {
    try {
      setLoading(true);
      await fetchPostJSON<{ success: boolean }>('/api/contact', value);
      toast.success('Send email success');
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="relative bg-black">
      <div className="hidden md:block">
        <Image
          src="/assets/desktop/Desktop Transparent-03-high.png"
          alt="contact"
          layout="responsive"
          objectFit="cover"
          width={1440}
          height={422}
        />
      </div>
      <div className="md:hidden">
        <Image
          src="/assets/mobile/Mobile Transparent-03.png"
          alt="contact"
          layout="responsive"
          objectFit="cover"
          width={768}
          height={598}
        />
      </div>
      <div className="flex flex-col md:flex-row bg-black px-10 md:px-[86px] py-[50px] gap-10">
        <div className="text-white flex-1 my-auto">
          <h1 className="mt-2 md:mt-10 heading uppercase text-4xl md:text-7xl">
            GET IN TOUCH
          </h1>
          <p className="uppercase mt-6 md:mt-10 text-sm whitespace-nowrap">
            University Ave, Toronto, ON M5J 2P1
          </p>
          <a
            href="mailto:hello@decode3.xyz"
            className="uppercase mt-2 text-sm hover:text-gray-200 underline text-decode3"
          >
            hello@decode3.xyz
          </a>
        </div>
        <div className="flex-1">
          <ContactForm onSubmit={handleSendEmail} loading={loading} />
        </div>
      </div>
    </div>
  );
};

Contact.getLayout = (page: ReactElement) => (
  <PublicLayout>
    {page}
    <Toaster />
  </PublicLayout>
);

export default Contact;
