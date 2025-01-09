import Hero from '@/components/Hero';
import Page from './events/page';
import './globals.css';

export default function Home() {
  return (
    <div className='mt-16'>
      <Hero />
      <Page />
    </div>
  );
}
