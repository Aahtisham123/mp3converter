import StaticPage, { staticPageMetadata } from '@/components/StaticPage';

export const generateMetadata = ({ params }) => staticPageMetadata(params, 'terms');

export default function Page({ params }) {
  return <StaticPage params={params} slug="terms" />;
}
