export const formantLinks = (links = []) => {
  return links.map((link) => {
    delete link.users_id
    return link
  })
}
