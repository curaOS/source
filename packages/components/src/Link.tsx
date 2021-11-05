import type { ReactChild, ReactChildren } from 'react';
import LinkNext from "next/link";

export const Link = ({ href, children }: { href: string, children?: ReactChild | ReactChildren }) => {
  const isLocal = !(href.includes("http:") || href.includes("https:"));
  if (!isLocal) return (
    <a href={href}>
      {children}
    </a>
  )
  else return (
    <LinkNext href={href}>
      {children}
    </LinkNext>
  );
}
