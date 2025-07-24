export const isAuthenticated = (user) => !!user;

export const hasAccess = (user = {}, rights = []) => true
//   rights.some((right) => user.accessTo && user.accessTo.includes(right));

export const canUseThis = (user = {}, rights = []) =>true
//   rights.some(
//     (right) => user.functionality && user.functionality.includes(right)
//   );

export const hasRole = (user, roles) =>
  roles.some((role) => user.roles.includes(role));
