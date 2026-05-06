export default function Footer() {
  return (
    <footer className="py-12 px-6 flex flex-col md:flex-row justify-between items-center border-t border-charcoal-light bg-charcoal text-white relative z-10">
      <p className="text-sm text-gray-400">© 2026 Creative Portfolio. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">Twitter</a>
        <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">LinkedIn</a>
        <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">GitHub</a>
      </div>
    </footer>
  );
}
