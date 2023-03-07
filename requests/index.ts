import api from "./axios"

export async function getHeroes(address: String|null) {
    if (!address) return
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
  
      return api.get(`heroes?address=${address}`, config)
  }

  export async function stopProfession(address: String|null, profession:String) {
    if (!address) return
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
  
      return api.get(`stop_questing?address=${address}&profession=${profession}`, config)
  }

  export async function resumeProfession(address: String|null, profession:String) {
    if (!address) return
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
  
      return api.get(`resume_questing?address=${address}&profession=${profession}`, config)
  }

  export async function updateHeroes(address: String|null) {
    if (!address) return
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
  
      return api.get(`update_heroes?address=${address}`, config)
  }