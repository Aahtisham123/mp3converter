import ReviewsAdmin from '@/components/ReviewsAdmin';

export const metadata = {
  title: 'Review moderation',
  robots: { index: false, follow: false },
};

export default function ReviewsAdminPage() {
  return (
    <div className="container section">
      <h1>Review moderation</h1>
      <ReviewsAdmin />
    </div>
  );
}
