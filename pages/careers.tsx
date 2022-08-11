import React from 'react';
import Layout from '../components/Layout';

const markdown = `
  <div data-tf-widget="BBbUa9CW" data-tf-iframe-props="title=Decode 3 Careers" data-tf-medium="snippet" style="width:100%;height:100%;"></div>
  <script src="//embed.typeform.com/next/embed.js"> </script>
`;

const Careers = () => {
  return (
    <Layout>
      <div className="py-20 bg-black flex items-center" dangerouslySetInnerHTML={{ __html: markdown }} />
    </Layout>
  );
};

export default Careers;
