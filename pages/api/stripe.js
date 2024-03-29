import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1Lyrz6IeK621J6u89aqqbhk3" },
          { shipping_rate: "shr_1LyrzgIeK621J6u8JEuCv2ZJ" },
        ],

        line_items: req.body.map((item) => {
            const img = item.image[0].asset._ref;
            const newImage = img.replace("image-", 'https://cdn.sanity.io/images/w7zg262g/production/').replace('-webp', '.webp').replace('-jpg', '.jpg').replace('-png', '.png');
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: item.name,
                        images: [newImage],
                    },
                    unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                    maximum: 10,
                },
                quantity: item.quantity,
            };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}


// import Stripe from 'stripe';

// const stripe = new Stripe('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const params = {
//         // Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
//         submit_type: 'pay',
//         mode: 'payment',
//         payment_method_types: ['card'],
//         billing_address_collection: 'auto',
//         shipping_options: [
//           { shipping_rate: 'shr_1Lyrz6IeK621J6u89aqqbhk3' },
//         ],
//         line_items: req.body.map((item) => {
//           const img = item.image[0].asset._ref;
//           const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

//           return {
//             price_data: { 
//               currency: 'usd',
//               product_data: { 
//                 name: item.name,
//                 images: [newImage],
//               },
//               unit_amount: item.price * 100,
//             },
//             adjustable_quantity: {
//               enabled:true,
//               minimum: 1,
//             },
//             quantity: item.quantity
//           }
//         }),
//         success_url: `${req.headers.origin}/success`,
//         cancel_url: `${req.headers.origin}/canceled`,
//       }

//       // Create Checkout Sessions from body params.
//       const session = await stripe.checkout.sessions.create(params);

//       res.status(200).json(session);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }