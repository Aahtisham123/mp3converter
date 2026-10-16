import { notFound } from 'next/navigation';

// Any deeper, unknown URL shows the localized "page not found" screen.
export default function UnknownPage() {
  notFound();
}
