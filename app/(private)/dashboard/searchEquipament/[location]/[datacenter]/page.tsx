"use client";

import Datacenters from "@/app/components/Datacenters";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const datacenterIdParam = searchParams.get("id");
  const datacenterId = datacenterIdParam ? parseInt(datacenterIdParam, 10) : null;

  return (
    <div>
      {datacenterId !== null && <Datacenters id={datacenterId} />}
    </div>
  );
}

export default Page;
