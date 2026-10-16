import StaticPage, { staticPageMetadata } from '@/components/StaticPage';

export const generateMetadata = ({ params }) => staticPageMetadata(params, 'about');

export default function Page({ params }) {
  return <StaticPage params={params} slug="about" />;
}
