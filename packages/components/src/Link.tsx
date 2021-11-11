import React, { DetailedReactHTMLElement, ReactChild, ReactChildren } from 'react';

export const Link = ({ href, children, LinkComponent, ...props }: { href: string, LinkComponent: DetailedReactHTMLElement<any, any>, children?: ReactChild | ReactChildren }) => {
  const isLocal = !(href.includes("http:") || href.includes("https:"));

  if (!isLocal) return (
    <a href={href} {...props}>
      {children}
    </a>
  )
  else return (
    React.cloneElement(LinkComponent, { href, children, ...props })
  );
}
