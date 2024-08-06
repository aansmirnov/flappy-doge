export function getProdPathname() {
  const prodHref = window.location.href.split('/');
  const prodPathname = prodHref[prodHref.length - 1];

  return `/${prodPathname}`;
}
