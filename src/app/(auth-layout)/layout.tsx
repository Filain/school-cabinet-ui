export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-green-300 h-[calc(100vh-64px)] ">{children}</main>;
}
