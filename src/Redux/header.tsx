export const headers = ()=>{
    const accessToken = localStorage.getItem("accessToken")
      return {
        'Content-Type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
        'Authorization': "Bearer "+ accessToken
      }
    }