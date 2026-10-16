import StaticPage, { staticPageMetadata } from '@/components/StaticPage';

export const generateMetadata = ({ params }) => staticPageMetadata(params, 'privacy-policy');

export default function Page({ params }) {
  return <StaticPage params={params} slug="privacy-policy" />;
}
