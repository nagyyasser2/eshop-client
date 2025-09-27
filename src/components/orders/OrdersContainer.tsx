export default function OrdersContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="container mx-auto  max-w-8xl">{children}</div>
    </div>
  );
}
