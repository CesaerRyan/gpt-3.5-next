import '../global.css'
export const metadata = {
  title: 'GPT3.5 tester',
  description: 'learn chatGPT 3.5 and Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
