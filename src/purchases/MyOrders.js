import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./MyOrders.css"

export const MyOrders = () => {
    const [customerOrders, setCustomerOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])

    const localMiratUser = localStorage.getItem("mirat_user")
    const miratUserObject = JSON.parse(localMiratUser)

    const navigate = useNavigate()


    const getAllOrders = () => {
        fetch(`http://localhost:8088/purchases?_expand=customer&_expand=product`)
            .then(response => response.json())
            .then((ordersArray) => {
                setCustomerOrders(ordersArray)
            })
    }

    useEffect(
        () =>{
            getAllOrders()
        },
        []
    )

    useEffect(
        () => {
            const myOrders = customerOrders.filter((order) => order.customerId === miratUserObject.id)
            setFilteredOrders(myOrders)
        },
        [customerOrders]
    )


    const deleteButton = (order) => {
        if (!miratUserObject.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/purchases/${order.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllOrders()
                    })
            }} className="order__delete">Delete</button>
        } else {
            return ""
        }
    }

    return <>
        <h3>My Orders </h3>
        {filteredOrders.map((order) =>
            <section className="order" key={`order--${order.id}`}>
                <div className="order__info">
                    <div>Order Number # {order.id}</div>
                    <div># {order.quantityPurchased} cases ordered</div>
                    <div>Name: {order?.product?.name}</div>
                    <div>Size: {order?.product?.size}</div>
                </div>
                <button onClick={() => navigate(`/purchases/${order.id}/edit`)} className="order__edit">Edit Order</button>
                <div className="adminButtons">
                    {deleteButton(order)}
                </div>
            </section>
        )}
        <div className="newOrderButtonDiv">
            <button className="newOrder__button" onClick={() => navigate("/purchases/create")}>New Purchase Order</button>
        </div>
    </>
}