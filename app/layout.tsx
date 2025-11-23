export const metadata = {
  title: 'Cyber Container Icon',
  description: 'Dark glass shipping container app icon with glowing neon elements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
