import './globals.css';

export const metadata = {
  title: 'SKP Real Estate | Faridabad',
  description: 'SKP Real Estate - Properties for sale and rent in Faridabad.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
