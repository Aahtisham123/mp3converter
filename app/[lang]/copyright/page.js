import StaticPage, { staticPageMetadata } from '@/components/StaticPage';

export const generateMetadata = ({ params }) => staticPageMetadata(params, 'copyright');

export default function Page({ params }) {
  return <StaticPage params={params} slug="copyright" />;
}
