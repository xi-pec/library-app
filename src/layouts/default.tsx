export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen max-w-md p-10 m-auto">{children}</div>;
}
