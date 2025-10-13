export const login = async (email, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (response.ok) {
      const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log(data,'data login route');
        
        //localStorage.setItem('tenant', JSON.stringify(data));
      return data;
    } else {
      throw new Error('Login failed');
    }
  
}