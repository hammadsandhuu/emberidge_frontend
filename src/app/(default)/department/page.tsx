import { Metadata } from "next";
import Container from "@/components/shared/container";
import Breadcrumb from "@/components/shared/breadcrumb";
import React, { Suspense } from "react";
import Loading from "@/components/shared/loading";
import DepartmentPageContent from "./department-page-content";

export const metadata: Metadata = {
  title: "Category Page",
};
function SearchBarFallback() {
  return <Loading />;
}
export default async function Page() {
  return (
    <Container>
      <div className="py-7 lg:py-8  blog-category">
        <Breadcrumb />
        <Suspense fallback={<SearchBarFallback />}>
          <div className="pt-7 lg:pt-8">
            <DepartmentPageContent />
          </div>
        </Suspense>
      </div>
    </Container>
  );
}
