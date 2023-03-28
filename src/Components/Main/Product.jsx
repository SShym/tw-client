import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import noImage from '../../images/no-image.png';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const Product = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const matches = useMediaQuery('(max-width: 422px)');
    const navigate = useNavigate();

    const delay = isHovered ? '0s' : '0.1s';
    const transition = `transform 0.2s ${delay} ease-out`;
    const transform = isHovered ? 'scale(1.07)' : 'scale(1)';
  
    return(
        <div style={{ width: matches ? '87vw' : '210px', padding:'5px' }}>
            <Card onClick={() => navigate(`/${product._id}`)} sx={{ minWidth: 200, cursor:'pointer', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <img 
                    onMouseOver={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style={{
                        width: matches ? '100%' : '200px', 
                        transform, 
                        transition,
                        height: matches ? '100%' : '150px',
                        objectFit:'cover'
                    }} 
                    src={product.imageUrl || noImage} alt="photoofproducts" 
                />
                <CardContent>
                    <Typography sx={{ textAlign:'center' }} gutterBottom variant="h5" component="div">
                        {product?.name}
                    </Typography>
                    <Typography sx={{ textAlign:'center' }} variant="body2" color="text.secondary">
                        Вес: {product?.weight}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Product;