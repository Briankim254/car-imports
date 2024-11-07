"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { JSX } from "react";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment !== "");
    const breadcrumbs: JSX.Element[] = [];
    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      if (segment === "admin") {
        currentPath = "/admin/";
      } else {
        currentPath += `/${segment}`;
      }

      // Skip numeric segments (likely IDs)
      if (!isNaN(Number(segment))) return;

      // Special case for "admin" - always show it
      const label = segment === "admin" ? "Admin" : capitalizeWords(segment);

      if (index === pathSegments.length - 1) {
        breadcrumbs.push(
          <BreadcrumbItem key={currentPath}>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else {
        breadcrumbs.push(
          <BreadcrumbItem key={currentPath}>
            <BreadcrumbLink href={currentPath}>{label}</BreadcrumbLink>
          </BreadcrumbItem>
        );
        breadcrumbs.push(
          <BreadcrumbSeparator key={`separator-${currentPath}`} />
        );
      }
    });

    return breadcrumbs;
  };

  const capitalizeWords = (str: string) => {
    return str
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/-/g, " ");
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
    </Breadcrumb>
  );
}
