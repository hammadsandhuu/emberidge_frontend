interface AdditionalInfoTabContentProps {
  data: any;
}

export default function AdditionalInfoTabContent({
  data,
}: AdditionalInfoTabContentProps) {
  return (
    <table className="w-full text-sm">
      <tbody>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-brand-dark font-medium w-1/4">Brand</td>
          <td className="py-3 px-4">{data?.brand || "N/A"}</td>
        </tr>
        <tr className="">
          <td className="py-3 px-4 text-brand-dark font-medium">Model</td>
          <td className="py-3 px-4">{data?.model || "N/A"}</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-brand-dark font-medium">Category</td>
          <td className="py-3 px-4">{data?.category?.name || "N/A"}</td>
        </tr>
        <tr className="">
          <td className="py-3 px-4 text-brand-dark font-medium">In Stock</td>
          <td className="py-3 px-4">{data?.in_stock ? "Yes" : "No"}</td>
        </tr>
        <tr className="bg-gray-50">
          <td className="py-3 px-4 text-brand-dark font-medium">Quantity</td>
          <td className="py-3 px-4">{data?.quantity || 0}</td>
        </tr>
      </tbody>
    </table>
  );
}
