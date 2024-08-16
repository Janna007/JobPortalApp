
//create subscription for user

export const createSubscription=async(req,res,next)=>{
    const { paymentMethodId, customerId, priceId } = req.body;

    try {
      // Attach payment method to customer
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
  
      // Set the default payment method on the customer
      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
  
      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        expand: ['latest_invoice.payment_intent'],
      });
  
      res.send(subscription);
    } catch (error) {
      res.status(400).send({ error: { message: error.message } });
    }


}