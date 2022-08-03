export default function Footer() {
  return (
    <footer className="p-4 bg-black p-6 border-t border-t-neutral-600 h-24 clear-both relative">
      <ul className="flex flex-wrap items-center justify-center gap-x-[95px] mt-3 text-sm text-white">
        <li>
          <a href="#" className="hover:underline md:mr-6 uppercase">
            Terms of service
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline md:mr-6 uppercase">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline md:mr-6 uppercase">
            Twitter
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline uppercase">
            Made in Toronto with{' '}
          </a>
        </li>
      </ul>
    </footer>
  );
}
