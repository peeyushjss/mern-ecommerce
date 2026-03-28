import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../api/axios';


const Navbar = () => {

  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await api.get(`/user/cart/${userId}`);
        const total = response.data.items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };

    fetchCartCount();
    window.addEventListener('cartUpdated', fetchCartCount); // Listen for cart updates

    return () => {
      window.removeEventListener('cartUpdated', fetchCartCount); // Clean up listener on unmount
    };
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setCartCount(0);
    navigate('/login');
  };

  return (
    <nav className='flex justify-between p-4 shadow'>
      <Link to="/" className='text-xl font-bold'>Agarwal E-Commerce</Link>
      <div className='flex items-center gap-4'>
        <Link to="/cart" className='relative text-xl'>🛒</Link>
        {cartCount > 0 && (
          <span className='mt-3 mr-21 absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center'>
            {cartCount}
          </span>
        )}
        {userId ? (
          <>
            {/* <Link to="/products" className='text-lg'>Products</Link> */}
            <button onClick={handleLogout} className='text-lg'>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className='text-lg'>Login</Link>
            <Link to="/signup" className='text-lg'>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;