import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import axios from 'axios'; 
import { Button } from '@mui/material'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import Snackbar from '@mui/material/Snackbar'; 
import MuiAlert from '@mui/material/Alert'; 

const ProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true); 
                setError(null);

                if (!id || typeof id !== 'string' || id.length !== 24 || !/^[0-9a-fA-F]+$/.test(id)) {
                    setError("Noto'g'ri mahsulot identifikatori (ID) formati. ID 24 ta belgidan iborat bo'lishi kerak.");
                    setLoading(false);
                    console.error("ProductDetail: ID formatlash xatosi:", id);
                    return; 
                }
                const apiUrl = `https://green-shop-backend.onrender.com/api/flower/${id}?access_token=68063351a46b81457373a349`;
                
                console.log("ProductDetail: API ga so'rov yuborilmoqda:", apiUrl); 

                const res = await axios.get(apiUrl);

                console.log("ProductDetail: API javobi:", res.data);

                if (res.data && res.data.data) {
                    setProduct(res.data.data);
                } else if (res.data) {
                    setProduct(res.data);
                } else {
                    setError("Mahsulot ma'lumotlari topilmadi. Serverdan bo'sh javob qaytdi.");
                }

                setLoading(false);
            } catch (err) {
                setError("Mahsulotni yuklashda xato yuz berdi. Iltimos, keyinroq urinib ko'ring.");
                console.error("ProductDetail: API chaqiruvida xato:", err);
                if (err.response) {
                    console.error("ProductDetail: Xato javob datasi:", err.response.data);
                    console.error("ProductDetail: Xato javob statusi:", err.response.status);
                    console.error("ProductDetail: Xato javob sarlavhalari:", err.response.headers);
                } else if (err.request) {
                    console.error("ProductDetail: Xato so'rov:", err.request);
                } else {
                    console.error("ProductDetail: Error message:", err.message);
                }
                setLoading(false); 
            }
        };

        if (id) {
            console.log("ProductDetail: useParams dan olingan ID:", id); 
            fetchProduct();
        } else {
            setError("Mahsulot identifikatori (ID) URL da mavjud emas.");
            setLoading(false);
        }
    }, [id]); 

    const addToCart = (flower) => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const exists = cart.find(item => item._id === flower._id);

        if (!exists) {
            const updatedCart = [...cart, { ...flower, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const updatedCart = cart.map(item =>
                item._id === flower._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }

        window.dispatchEvent(new Event('cartUpdated'));
        handleSnackbarOpen();
    };

    const handleSnackbarOpen = () => {
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    if (loading) {
        return (
            <div className="container mx-auto py-10 text-center text-xl font-semibold text-green-600">
                Mahsulot yuklanmoqda...
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto py-10 text-center text-xl font-semibold text-red-500">
                {error}
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container mx-auto py-10 text-center text-xl font-semibold text-gray-500">
                Mahsulot topilmadi.
            </div>
        );
    }

    return (
        <div className="container max-w-[1216px] mx-auto overflow-hidden pt-2 px-4 py-8">
            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MuiAlert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Mahsulot savatga qo'shildi!
                </MuiAlert>
            </Snackbar>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/2 flex justify-center items-center p-4 bg-gray-100 rounded-lg shadow-sm">
                    <img src={product.main_image} alt={product.title} className="max-w-full h-auto object-contain max-h-[500px]" />
                </div>

                <div className="lg:w-1/2 p-4">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                    {product.sku && <p className="text-gray-600 mb-2">**SKU:** {product.sku}</p>}

                    <div className="flex items-center mb-4">
                        <p className="text-green-600 text-2xl font-bold mr-3">${product.price.toFixed(2)}</p>
                        {product.old_price && (
                            <p className="text-gray-500 line-through text-lg">${product.old_price.toFixed(2)}</p>
                        )}
                        {product.discount && product.discount > 0 && (
                            <span className="ml-3 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                                {product.discount}% OFF
                            </span>
                        )}
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Miqdor:</h3>
                        <p className="text-gray-800">1 (hozircha qattiq belgilangan)</p>
                    </div>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#46A358',
                            '&:hover': { backgroundColor: '#39a84a' },
                            padding: '12px 24px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            boxShadow: 'none' 
                        }}
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => addToCart(product)}
                    >
                        Savatga qo'shish
                    </Button>

                    <div className="mt-8 border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Mahsulot ma'lumotlari</h3>
                        <p className="text-gray-700">
                            **Turi:** {product.type || 'Noma\'lum'} <br />
                            **Hajmi:** {product.size || 'Noma\'lum'} <br />
                            {product.category && product.category.title && <p className="text-gray-700">**Kategoriya:** {product.category.title}</p>}
                            {product.rating && <p className="text-gray-700">**Reyting:** {product.rating} / 5</p>}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;