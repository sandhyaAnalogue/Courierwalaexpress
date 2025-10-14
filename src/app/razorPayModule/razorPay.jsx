import { Alert, StyleSheet } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import { createOrderAPI, verifyOrderAPI } from '../../utils/apiCalls';


const PayMoney = async (amount) => {
    console.log(`Paying you ${amount}`)
    const Price = parseInt(amount)
    try {
        const order = await createOrderAPI(Price)
        if (order) {
            const options = {
                key: order.data.key,
                order_id: order.data.order.id,
                // currency: order.data.order.currency,
                // name: order.data.order.entity,
                // prefill: {
                //     name: "Test User",
                //     email: "madipellyrohith@gmail.com",
                //     contact: "9951072023",
                // },
                // notes: {
                //     address: "11-24-140,2nd",
                // },
                // theme: {
                //     color: "pink",
                // },
            }
            RazorpayCheckout.open(options)
                .then((data) => {
                    console.log("Payment >", data)
                    verifySignature(data)
                })
                .catch((error) => {
                    console.log("Error in RazorpayCheckout", error,error.response)
                })
        }

    } catch (error) {
        console.log(error)
    }
}

const verifySignature = async (paymentData) => {
    try {
        const res = await verifyOrderAPI(paymentData);
        if (res?.data) {
            console.log(res.data.message)
            setTimeout(() => {
                Alert.alert(res.data.message)
            }, 200);
        }
    } catch (error) {
        console.error(">>>>", error.response.data.message)
        setTimeout(() => {
            Alert.alert("PaymentFailed")
        }, 2000);
        if (error.response.status === 401) {
            console.error(">>>>", error.response.data.message)
        }
        // setFormError("Something went wrong.");

    }
};



export default PayMoney

const styles = StyleSheet.create({})



// Working fine
