import CustomLink from './CustomLink';

const footer = [
  {
    title: 'Twitter',
    url: 'https://twitter.com/decode3_xyz',
    openNewTab: true
  },
  {
    title: 'Privacy Policy',
    url: '/privacy-policy'
  },
  {
    title: 'Terms of service',
    url: '/terms-of-service'
  },
  {
    title: 'Made in Toronto with ❤️',
    url: ''
  }
];

export default function Footer() {
  return (
    <footer className="bg-black p-4 border-t border-t-neutral-600">
      <ul className="flex flex-wrap flex-col md:flex-row items-center justify-center gap-6 md:gap-[95px] mt-3 text-sm text-white">
        {footer.map(({ title, url, openNewTab }, index) => (
          <li key={index} className="uppercase">
            <CustomLink
              className={url ? 'hover:underline' : ''}
              href={url}
              openNewTab={openNewTab}
            >
              {title}
            </CustomLink>
          </li>
        ))}
      </ul>
    </footer>
  );
}
