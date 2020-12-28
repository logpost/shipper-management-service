import axios from 'axios'
import config from '../config/config'

class AccountAdapter {
  private _prefix = config.account.api.prefix_route
  private _fetcher = axios.create({
    baseURL: config.account.api.base_url,
  })

  public generateAccessTokenFromRefreshToken = async (refresh_token: string) => {
    try {
      const res = await this._fetcher.post(`${this._prefix}/token`, { refresh_token })
      return res
    } catch (error) {
      return error.response.data
    }
  }
}

export default new AccountAdapter()
