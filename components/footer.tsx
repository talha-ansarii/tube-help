import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex items-center justify-between py-4">
        <p>&copy; 2024 Tube Help. All rights reserved.</p>
        <nav className="flex space-x-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/faq" className="hover:underline">
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  )
}

