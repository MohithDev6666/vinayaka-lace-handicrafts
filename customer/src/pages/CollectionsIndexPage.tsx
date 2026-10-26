import { CollectionsSection } from '../components/home/CollectionsSection.tsx';
import { usePageTitle } from '../hooks/usePageTitle.ts';

export function CollectionsIndexPage() {
  usePageTitle('Collections | Vinayaka');
  return <CollectionsSection titleAs="h1" />;
}
