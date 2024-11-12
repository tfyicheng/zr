const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  dict: (state) => state.dict.dict,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  id: (state) => state.user.id,
  deptName: (state) => state.user.deptName,
  deptId: (state) => state.user.deptId,
  notifyNum: (state) => state.user.notifyNum,
  provinceData: (state) => state.user.provinceData,
  introduction: (state) => state.user.introduction,
  roles: (state) => state.user.roles,
  permissions: (state) => state.user.permissions,
  permission_routes: (state) => state.permission.routes,
  topbarRouters: (state) => state.permission.topbarRouters,
  defaultRoutes: (state) => state.permission.defaultRoutes,
  sidebarRouters: (state) => state.permission.sidebarRouters,
};
export default getters;

// 使用 this.$store.state.user.deptName
//      this.$store.getters.permission_routes
