import { ORDER_CANCELLED, ORDER_CONFIRMED, ORDER_DELIVERED, ORDER_SHIPPED } from "@/constants/orderStatus";

const OrderStatus = ({status}) => {
    if(status == ORDER_CANCELLED){
        return(
        <span className="bg-red-600/10 border border-red-600 text-fg-brand-strong text-red-600 font-medium px-1.5 py-0.5 rounded">
        Cancelled
      </span>
        );
    }
    if(status == ORDER_CONFIRMED){
        return(
        <span className="bg-blue-600/10 border border-blue-600 text-fg-brand-strong text-blue-600 font-medium px-1.5 py-0.5 rounded">
        Confirmed
      </span>
        );
    }
    if(status == ORDER_SHIPPED){
        return(
        <span className="bg-indigo/10 border border-indigo-600 text-fg-brand-strong text-indigo-600 font-medium px-1.5 py-0.5 rounded">
        Shipped
      </span>
        );
    }
    if(status == ORDER_DELIVERED){
        return(
        <span className="bg-green-600/10 border border-green-600 text-fg-brand-strong text-green-600 font-medium px-1.5 py-0.5 rounded">
        Delivered
      </span>
        );
    }
       return(
        <span className="bg-yellow-600/10 border border-yellow-600 text-fg-brand-strong text-yellow-600 font-medium px-1.5 py-0.5 rounded">
        Pending
      </span>
        );

};

export default OrderStatus;
