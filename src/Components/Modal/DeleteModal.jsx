import x from './DeleteModal.module.css';
import Button from '@mui/material/Button';
import { ReactComponent as CloseSvg } from '../../images/cancel.svg';
import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const DeleteModal = ({ modal, setModal, handleDelete }) => {
    const loading = useSelector(state => state.appReducer.loading)    
    
    const closeModal = () => {
        if(!loading){
            setModal(false);
        }
    }
    
    const red = createTheme({
        palette: {
          primary: {
            main: 'rgb(255, 77, 77)'
          },
        },
    });

    const gray = createTheme({
        palette: {
          primary: {
            main: 'rgb(170, 170, 170)'
          },
        },
    });

    return (
        <div onClick={closeModal} className={modal ? `${x.modal} ${x.active}` : x.modal}>
            <div className={modal ? `${x.modalContent} ${x.active}` : x.modalContent} onClick={e => e.stopPropagation()}>
                <CloseSvg className={x.svg}/>
                <span className={x.sure}>Are you sure?</span>
                <span className={x.text}>Do you really want to delete these product? This<br/> process cannot be undone</span>
                <div style={{width:'75%'}}>
                    <div style={{display:'flex', justifyContent:'space-around', textAlign:'center'}}>
                        <Button 
                            disabled={loading} 
                            style={{fontFamily:'sans-serif', fontSize:'10px', color: 'white' }} 
                            onClick={()=> setModal(false)}                                    
                            size="large" 
                            variant="contained"
                            theme={gray}>
                            cancel
                        </Button>   
                        <Button 
                            style={{fontFamily:'sans-serif', fontSize:'10px' }} 
                            onClick={handleDelete} 
                            size="large" 
                            variant="contained"
                            theme={red}>
                            delete
                        </Button>   
                    </div>
                </div>
                <span onClick={closeModal} className={x.close}>&times;</span>
            </div>
        </div>
    );
}
export default DeleteModal;