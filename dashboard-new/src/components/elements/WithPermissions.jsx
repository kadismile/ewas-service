import { store } from '../../redux/store';

export const WithPermissions = ({permitedPermissions, children}) => {
  let user = store?.getState()?.user?.user
  if (user) {
    user = user.user
  }

  const chekForPermission = () => {
    const { permissions } = user || {}
    let permitted = false 
    if (user?.role === 'superAdmin') {
      return true
    }
    
    for (let perm of permissions) {
      if (permitedPermissions.includes(perm)) {
        permitted = true
      }
    }
    return permitted
  }

  return (
    chekForPermission() ?  children : null
  )
}