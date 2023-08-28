import indexRouter  from './index.js'
import agencyRouter  from './agency-routes.js'
import reportRouter  from './report-routes.js'
import departmentRouter  from './department-routes.js'
import complainerRouter  from './complainer-routes.js'
import userRouter  from './user-routes.js'

export default [
  ['/', indexRouter],
  ['/agency', agencyRouter],
  ['/report', reportRouter],
  ['/department', departmentRouter],
  ['/complainer', complainerRouter],
  ['/auth', userRouter],
];