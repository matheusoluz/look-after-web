import { AclInstaller, AclCreate, AclRule } from 'vue-acl'

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  Vue.use(AclInstaller)
  const aclCreate = new AclCreate({
    initial: 'unauthenticated',
    notfound: '/login',
    router,
    acceptLocalRules: true,
    globalRules: {
      isAdmin: new AclRule('admin').generate(),
      isEmployee: new AclRule('admin').or('employee').generate(),
      isClient: new AclRule('admin').or('employee').or('client').generate(),
      isAuthenticated: new AclRule('admin').or('employee').or('client').or('authenticated').generate(),
      isEveryone: new AclRule('admin').or('employee').or('client').or('authenticated').or('unauthenticated').generate()
    }
  })

  Vue.use(aclCreate)
}
