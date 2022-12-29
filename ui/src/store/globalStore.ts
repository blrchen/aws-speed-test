import { makeObservable, observable } from 'mobx'

// import config from '@/config'

class GlobalStore {
  user: any = {
    avatar: null,
    email: null,
    expireFlag: 0,
    id: 0,
    isDel: 0,
    loginType: 0,
    nickname: null,
    phone: null,
    remark: null,
    roleCode: null,
    roleName: null,
    ssotoken: null,
    tenantCode: null,
    tenantId: 0,
    token: null,
    uniqueCode: null,
    username: null
  }

  constructor() {
    makeObservable(this, {
      user: observable
    })
  }
}

export default new GlobalStore()
