import CustomLink from './CustomLink';

const footer = [
  {
    title: 'Privacy Policy',
    url: '/privacy-policy'
  },
  {
    title: 'Terms of service',
    url: '/terms-of-service'
  }
];

export default function Footer() {
  return (
    <footer className="bg-black p-4 border-t border-t-neutral-600">
      <ul className="flex flex-wrap gap-y-2 lg:gap-y-0 justify-center uppercase gap-x-8 lg:gap-x-20 text-xs lg:text-sm text-white">
        <CustomLink
          key="twitter"
          className="hover:underline hidden lg:block"
          href={process.env.NEXT_PUBLIC_TWITTER_URL}
          openNewTab={true}
        >
          Twitter
        </CustomLink>
        {footer.map(({ title, url }, index) => (
          <li key={index} className="">
            <CustomLink className="hover:underline" href={url}>
              {title}
            </CustomLink>
          </li>
        ))}
        <span className="text-white text-center">Made in Toronto with ❤️</span>
      </ul>
    </footer>
  );
}
