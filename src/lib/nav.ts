export function isNavItemActive(
  pathname: string,
  href: string,
  children?: { href: string }[]
): boolean {
  if (pathname === href) return true;

  if (
    children?.some(
      (child) =>
        pathname === child.href || pathname.startsWith(`${child.href}/`)
    )
  ) {
    return true;
  }

  if (href !== "/" && pathname.startsWith(`${href}/`)) return true;

  return false;
}
