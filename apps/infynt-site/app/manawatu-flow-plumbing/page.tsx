import { Metadata } from 'next';
import ManawatuFlowDemo from '@/components/demos/manawatu-flow/ManawatuFlowDemo';

export const metadata: Metadata = {
  title: 'Manawatū Flow Plumbing Demo | Infynt',
  description: 'Premium local plumbing website demo for Palmerston North, New Zealand.',
};

export default function ManawatuFlowPage() {
  return <ManawatuFlowDemo />;
}
