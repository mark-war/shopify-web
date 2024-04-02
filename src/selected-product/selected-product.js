import React, { useState, useEffect } from 'react';
import './selected-product.css'
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

function SelectedProduct(props) {
    const [onWishList, setOnWishList] = useState(ds.itemOnWishList(props.product));

    useEffect(() => {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, onWishListChanged);
        return () => {
            ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
        }
    }, [props.product]);

    const onWishListChanged = (newWishList) => {
        setOnWishList(ds.itemOnWishList(props.product));
    }

    const removeProduct = () => {
        ds.removeWishListItem(props.product);
        setOnWishList(onWishList);
    }

    return (
        <li className='list-group-item pc-selected'>
            <a onClick={removeProduct} className='btn btn-outline-danger'>X</a>
            <p>{props.product.title} | <b>${props.product.price}</b></p>
        </li>
    );
}

export default SelectedProduct;


// function SelectedProduct(props) {
    
//     const removeProduct = () => {
//         console.log(props.product);
//         ds.removeWishListItem(props.product);
//     }

//     return (
//         <li className='list-group-item pc-selected'>
//             <a onClick={removeProduct} className='btn btn-outline-danger'>X</a>
//             <p>{props.product.title} | <b>${props.product.price}</b></p>
//         </li>
//     );
// }

// import React, {Component} from 'react';
// import './selected-product.css'
// import DataService from '../services/data-service';

// let ds = new DataService();
// class SelectedProduct extends Component {

//     constructor(props) {

//         super(props);

//         this.removeProduct = this.removeProduct.bind(this);
//     }

//     removeProduct = () => {
//         ds.removeWishListItem(this.props.product);
//     }

//     render () {
//         return (
//                 <li className='list-group-item pc-selected'>
//                     <a onClick={() => this.removeProduct()} className='btn btn-outline-danger'>X</a>
//                     <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
//                 </li>
//             );
//     }
// }

// export default SelectedProduct;