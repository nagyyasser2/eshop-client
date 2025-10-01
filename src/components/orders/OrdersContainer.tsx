export default function OrdersContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bbg-gradient-to-br from-indigo-50 to-purple-50 py-2">
      <div className="container mx-auto  bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl  ">
        {children}
      </div>
    </div>
  );
}
