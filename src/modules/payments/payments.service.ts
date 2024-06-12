import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

@Injectable()
export class PaymentsService {
  async createPaymenttt(req: Request) {
    const client = new MercadoPagoConfig({
      //toke cuenta personal
      accessToken: process.env.MP_ACCESS_TOKEN,
      /*       accessToken:
        //token de cuenta de prueba
        'TEST-2645491994986306-060612-bc53c7a7a78b3f301b30310ac4068618-1843561803', */
    });

    try {
      const body = {
        items: [
          {
            id: "1",
            title: req.body.title,
            quantity: Number(req.body.quantity),
            unit_price: Number(req.body.unit_price),
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "https://www.youtube.com/?gl=AR&hl=es-419",
          pending: "https://www.youtube.com/?gl=AR&hl=es-419",
          failure: "https://www.youtube.com/?gl=AR&hl=es-419",
        },
        notification_url:
          "https://zbs04g65-3001.brs.devtunnels.ms/payments/webhook",
        auto_return: "approved",
      };

      const preference = new Preference(client);
      const result = await preference.create({ body });
      console.log(result);
      return { url: result.init_point };
    } catch (error) {
      if (error)
        console.log("something goes wrong in payment proceess. Plis try again");
    }
  }

  async getPyaMethods() {
    const response = await fetch(
      "https://api.mercadopago.com/v1/payment_methods",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.map((element) => element.id);
  }

  async webhook(req) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
    const payment = new Payment(client);
    const paidState = req.body;

    if (paidState.type == "payment") {
      const data = await payment.capture({ id: paidState.data.id });
      if (data.status === "approved") {
        console.log(data);
      }
    }
  }
}
