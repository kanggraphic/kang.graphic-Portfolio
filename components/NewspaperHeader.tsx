import Link from "next/link";

export default function NewspaperHeader() {
  return (
    <header className="divider-horizontal pb-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-gothic font-black text-2xl tracking-tight">발행일</h1>
        </div>
        <nav className="flex gap-6 font-gothic text-sm font-medium uppercase tracking-wide">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/archive" className="hover:underline">Archive</Link>
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/article" className="hover:underline">Article</Link>
        </nav>
      </div>
    </header>
  );
}
