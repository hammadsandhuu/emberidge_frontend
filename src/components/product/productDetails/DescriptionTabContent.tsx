import Image from "@/components/shared/image";

interface DescriptionTabContentProps {
  data: any;
}

export default function DescriptionTabContent({
  data,
}: DescriptionTabContentProps) {
  return (
    <div className="text-sm sm:text-15px text-brand-muted leading-[2em] space-y-4 lg:space-y-5">
      <p>{data?.description}</p>
      <h3 className="text-brand-dark font-medium">Product Details</h3>
      <p>
        This high-quality product is designed with care and attention to detail.
        {data?.brand && ` Manufactured by ${data.brand},`} this item is perfect
        for your needs.
      </p>
    </div>
  );
}
