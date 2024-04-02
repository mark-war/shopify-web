import React, { useState, useEffect } from 'react';
import './product.css'
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

function Product(props) {
    const [onWishList, setOnWishList] = useState(ds.itemOnWishList(props.product));

    useEffect(() => {
        ns.addObserver(NOTIF_WISHLIST_CHANGED, null, onWishListChanged);
        return () => {
            ns.removeObserver(null, NOTIF_WISHLIST_CHANGED);
        }
    }, []);

    const onWishListChanged = (newWishList) => {
        setOnWishList(ds.itemOnWishList(props.product));
    }

    const onButtonClicked = () => {
        if (onWishList) {
            ds.removeWishListItem(props.product);
        } else {
            ds.addWishListItem(props.product);
        }
        setOnWishList(!onWishList);
    }
    
    var btnClass;
    if (onWishList) {        
        btnClass = "btn btn-danger";
    } else {            
        btnClass = "btn btn-primary";
    }

    return (
        <div className='card'>
            <img className='card-img-top' alt='Product' src={props.product.imgUrl}></img>
            <div className='card-block'>
                <h4 className='card-title'>{props.product.title}</h4>
                <p className='card-text'>Price: ${props.product.price}</p>
                <a onClick={() => onButtonClicked()} className={btnClass}>{onWishList ? "Remove from Wishlist" : "Add to Wishlist"}</a>
            </div>
        </div>
    );
}

export default Product;


//import React, {Component} from 'react';
// import './product.css'
// import DataService from '../services/data-service';
// import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

// let ds = new DataService();
// let ns = new NotificationService();
// class Product extends Component {

//     constructor (props) {
//         super (props);

//         this.state = {onWishList: ds.itemOnWishList()};
        
//         this.onButtonClicked = this.onButtonClicked.bind(this);
//         this.onWishListChanged = this.onWishListChanged.bind(this);
//     }

//     componentDidMount () {
//         ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
//     }

//     componentWillUnmount () {
//         ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
//     }

//     onWishListChanged (newWishList) {
//         this.setState({onWishList: ds.itemOnWishList(this.props.product)});
//     }

//     onButtonClicked = () => {
//         if (this.state.onWishList) {
//             ds.removeWishListItem(this.props.product);
//         } else {
//             ds.addWishListItem(this.props.product);
//         }
//     }

//     render () {

//         var btnClass;
//         if (this.state.onWishList) {        
//             btnClass = "btn btn-danger";
//         } else {
//             btnClass = "btn btn-primary";
//         }

//         return (
//             <div className='card'>
//                 <img className='card-img-top' alt='Product' src={this.props.product.imgUrl}></img>
//                 <div className='card-block'>
//                     <h4 className='card-title'>{this.props.product.title}</h4>
//                     <p className='card-text'>Price: ${this.props.product.price}</p>
//                     <a onClick={() => this.onButtonClicked()} className={btnClass}>{this.state.onWishList ? "Remove from Wishlist" : "Add to Wishlist"}</a>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Product;