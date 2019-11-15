console.log('hello world')



fetch('/api/accounts',{
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjJ9.vdxweq5yf3ZjJmcx08bWNm9u1e8r6RQLavwPmQkP0xo'
  }
} )
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.log(err))