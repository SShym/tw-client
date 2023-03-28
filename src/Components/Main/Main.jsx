import './Main.css';
import { useDispatch, useSelector } from "react-redux";
import { productsLoad, productLoad, productDelete } from '../../redux/actions';
import { ReactComponent as AddButton } from '../../images/add.svg'
import { ReactComponent as SearchIcon } from '../../images/search-icon.svg';
import { useState } from 'react';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ProductMenu from './ProductMenu';
import Product from './Product';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import DeleteModal from '../Modal/DeleteModal'

const Main = () => { 
    const [antiFlick, setAntiFlick] = useState(false); 
    const [open, setOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ id: null, editMode: false });
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [searchedProductName, setSearchedProductName] = useState('');

    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const products = useSelector((state) => state.mainReducer.products);
    const error = useSelector((state) => state.appReducer.error);
    const loading = useSelector(state => state.appReducer.loading)    
    
    setTimeout(() => {
        setAntiFlick(true);
    }, 800)

    const [sortType, setSortType] = useState('name');

    function handleSortByName(event) {
        if (event.target.checked) {
          setSortType('name'); 
        } else {
          setSortType(''); 
        }
    }

    function handleSortByCount(event) {
        if (event.target.checked) {
          setSortType('count');
        } else {
          setSortType(''); 
        }
    }

    const sortedAndFilteredProducts = products?.filter(product => product.name.toLowerCase().includes(searchedProductName.toLowerCase()))
        .sort((a, b) => {
            if (sortType === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortType === 'count') {
                return b.count - a.count;
            } else {
                return 0;
            }
        }
    );
    
    const handleEditproduct = (id) => {
        dispatch(productLoad(id));
        setOpen(true);
        setSelectedProduct({ id, editMode: true });
    }

    const handleDeleteProduct = () => {
        dispatch(productDelete(selectedProductId));
        setDeleteModalOpen(false);
    }

    const handleOpenDeleteModal = (id) => {
        setDeleteModalOpen(true);
        setSelectedProductId(id);
    }

    useEffect(() => {
        dispatch(productsLoad());
    }, []) // eslint-disable-line

    return(
        <div className='main-wrap'>
            {products
                ? <>
                    <div className="main-search-profile">
                        <SearchIcon />
                        <input onChange={e => setSearchedProductName(e.target.value)} placeholder="Filter by name..." type="text" />
                        <div className='main-sort-block'>
                            <div className='main-sort-text'>Sort menu</div>
                            <FormControlLabel
                                value="end"
                                control={<Checkbox checked={sortType === 'name'} onChange={handleSortByName} sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
                                label="by alphabetically"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="end"
                                control={<Checkbox checked={sortType === 'count'} onChange={handleSortByCount} sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />}
                                label="by quantity"
                                labelPlacement="end"
                            />
                        </div>
                    </div>
                    <div className='main-all-products'>
                        {sortedAndFilteredProducts?.map(product => 
                            <div key={product._id} className='main-product'>
                                {user &&
                                    <>
                                        <button onClick={() => handleOpenDeleteModal(product._id)} className='main-delete-selectedProduct-button'>Delete</button>
                                        <button onClick={() => handleEditproduct(product._id)} className='main-edit-selectedProduct-button'>Edit</button>
                                    </>
                                }
                                <Product product={product} />
                            </div>
                        )}
                    </div>
                    <ProductMenu open={open} setOpen={setOpen} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />
                    {!loading &&  <DeleteModal 
                        modal={deleteModalOpen} 
                        setModal={setDeleteModalOpen} 
                        handleDelete={handleDeleteProduct}
                    />}
                    {user && 
                        <AddButton 
                            onClick={() => setOpen(true)}
                            className='add-product'>
                        </AddButton>
                    }
                  </>
                : <div style={{ display: antiFlick ? 'block' : 'none' }}>
                    {!error &&
                        <Backdrop sx={{ display:'flex', flexDirection:'column', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={!products}>
                            <CircularProgress color='inherit' size={50} sx={{ marginBottom:'50px' }} />
                        </Backdrop>
                    }
                </div>
            }

        </div>
    )
}

export default Main;