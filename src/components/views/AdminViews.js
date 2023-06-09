import { Outlet, Route, Routes } from "react-router-dom"
import { AdminLocationsList } from "../locations/AdminLocations"
import { OrdersList } from "../../purchases/OrdersList"
import { PurchaseEdit } from "../../purchases/PurchaseEdit"
import { Admin } from "../Admins/Admin"
import { AdminEdit } from "../Admins/AdminEdit"
import "../auth/Login.css"

export const AdminViews = () => {
		return (
			<Routes>
				<Route path="/" element={
					<>
						<fieldset className="heading">
							<h1 className="logo">
								<img src="/priLogo.jpg"/>
							</h1>
							<h2>Take the Dive!</h2>
						</fieldset>
						<Outlet />
					</>
				}>
	
					<Route path="home" element={ <AdminLocationsList /> } />
					<Route path="orders" element={ <OrdersList /> } />
					<Route path="purchases/:purchaseId/edit" element={<PurchaseEdit />} />
					<Route path="myAccount" element={<Admin />} />
					<Route path="myAccount/:adminId/edit" element={<AdminEdit />} />

				</Route>
			</Routes>
		)
	}