import indexRouter from "./index.js";
import agencyRouter from "./agency-routes.js";
import reportRouter from "./report-routes.js";
import departmentRouter from "./department-routes.js";
import userRouter from "./user-routes.js";
import notificationRouter from "./notification-routes.js";
import articleRouter from "./article-routes.js";

export default [
  ["/", indexRouter],
  ["/agency", agencyRouter],
  ["/report", reportRouter],
  ["/department", departmentRouter],
  ["/auth", userRouter],
  ["/notification", notificationRouter],
  ["/article", articleRouter],
];
