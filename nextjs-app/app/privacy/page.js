// app/privacy-policy/page.tsx
import PrivacyPolicy from '@/app/components/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy | AMKA Kijana',
  description: 'AMKA Kijana privacy policy regarding the collection and use of personal information.'
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PrivacyPolicy />
    </main>
  );
}