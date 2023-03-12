import '../global.css'
export const metadata = {
  title: '可对话版 GPT ',
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
