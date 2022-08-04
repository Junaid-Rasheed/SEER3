export default function Footer() {
  return (

    <footer
      className="p-4 bg-black p-6 border-t border-t-neutral-600">
      <ul className="flex flex-wrap flex-col md:flex-row items-center justify-center gap-6 md:gap-[95px] mt-3 text-sm text-white">
        <li>
          <a href="#" className="hover:underline uppercase">Terms of service</a>
        </li>
        <li>
          <a href="#" className="hover:underline uppercase">Privacy Policy</a>
        </li>
        <li>
          <a href="#" className="hover:underline uppercase">Twitter</a>
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
