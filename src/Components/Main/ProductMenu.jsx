import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { productCreate, productEdit } from '../../redux/actions';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const ProductMenu = ({ open, setOpen, selectedProduct, setSelectedProduct }) => {
    const [base64photo, setBase64Photo] = useState(null);

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
        formik.setFieldValue("imageUrl", e.target.files[0]);
    }

    // const handleSetImgSize = (e) => {
    //     setImgSize({
    //         width: e.target.naturalHeight,
    //         height: e.target.naturalWidth
    //     })
    // }

    const loading = useSelector(state => state.appReducer.loading)
    const product = useSelector(state => state.mainReducer.product)

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            name: product?.name,
            count: product?.count,
            weight: product?.weight,
            imageUrl: product?.imageUrl,
        })
    }, [selectedProduct.id, product]) // eslint-disable-line

    useEffect(() => {
        formik.resetForm();
        setBase64Photo(null);
    }, [open]) // eslint-disable-line

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct({ id: null, editMode: false });
    }
    
    const handleRemoveImg = () => {
        setBase64Photo(null);
        formik.setFieldValue("imageUrl", null);
    }

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setBase64Photo(reader.result)
        }
    }

    const validationSchema = yup.object({
        name: yup.string('Enter name').required('Name is required'),
        count: yup.string('Enter count of pruduct').required('Count is required'),
        weight: yup.string('Weight author').required('Weight is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            count: '',
            weight: '',
            imageUrl: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            selectedProduct.editMode 
                ? dispatch(productEdit(selectedProduct.id, values, setOpen))
                : dispatch(productCreate(values, setOpen));
            resetForm();
        }
    })
      
    return (
        <div>
            {loading 
                ?   <Backdrop sx={{ display:'flex', flexDirection:'column', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                        <CircularProgress color='inherit' size={50} sx={{ marginBottom:'50px' }} />
                    </Backdrop>            
                :   <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">
                        {"Publish your product!"}
                    </DialogTitle>
                    <div style={{ display:'flex',  justifyContent:'center' }}>
                        <form onSubmit={formik.handleSubmit} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <TextField 
                                onChange={formik.handleChange}
                                sx={{ margin:'0px 15px 10px 15px' }} 
                                id="name"
                                name="name"
                                label="Name"
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                value={formik.values.name}
                            />
                            <TextField 
                                onChange={formik.handleChange}
                                sx={{ margin:'0px 15px 10px 15px' }} 
                                id="count"
                                type="number"
                                name="count"
                                label="Count"
                                error={formik.touched.count && Boolean(formik.errors.count)}
                                helperText={formik.touched.count && formik.errors.count}
                                value={formik.values.count}
                            />
                            <TextField 
                                onChange={formik.handleChange}
                                sx={{ margin:'0px 15px 10px 15px' }} 
                                id="weight"
                                name="weight"
                                label="Weight"
                                error={formik.touched.weight && Boolean(formik.errors.weight)}
                                helperText={formik.touched.weight && formik.errors.weight}
                                value={formik.values.weight}
                            />
                            <Button color="primary" variant="contained"  sx={{margin:'0px 10px 20px', width:'85%'}} type="submit">
                                Submit
                            </Button>
                        </form>
                        <div style={{ background:'rgb(13, 13, 13, 0.3)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'150px', height:'150px', margin:'5px 15px 15px 10px' }}>
                            {base64photo || formik.values.imageUrl
                                ?   <div style={{ boxShadow:'0px 0px 2px', position:'relative', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'150px', height:'150px' }}>
                                        <img 
                                            src={
                                                formik?.values?.imageUrl?.length > 0 
                                                    ? formik.values.imageUrl 
                                                    : base64photo} 
                                            style={{maxWidth:'100%', maxHeight:'100%'}} 
                                            alt="PhotoOfproducts" 
                                            // onLoad={handleSetImgSize}
                                        />
                                        <div onClick={handleRemoveImg} style={{ fontWeight:'bold', cursor:'pointer', fontSize:'18px', position:'absolute', top:'-20px', right:'-11px'}}>×</div>
                                    </div>
                                :   <Button sx={{width:'100%', height:'100%', borderRadius:'0', background:'rgb(143, 143, 143, 0.1)'}}
                                        variant="contained"
                                        component="label"
                                        >
                                            Upload File
                                        <input
                                            type="file"
                                            name="file" 
                                            id="file"
                                            accept="image/png, image/gif, image/jpeg" 
                                            onChange={handleOnChange}
                                            hidden
                                        />
                                    </Button>
                            }
                        </div>
                    </div>
                </Dialog>
            }
        </div>
    )
}

export default ProductMenu;