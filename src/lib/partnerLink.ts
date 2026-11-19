/** Appends the site's own UTM tags to a partner URL that is already published. */
export function partnerHref(url: string, content: string): string {
  const join = url.includes('?') ? '&' : '?';
  return `${url}${join}utm_source=suretyresearch&utm_medium=referral&utm_campaign=desk&utm_content=${content}`;
}
