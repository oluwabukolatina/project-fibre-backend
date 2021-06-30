import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';

const EmailTemplates = {
  generateInvoice(
    invoiceId: string,
    invoiceCreated: string,
    clientName: string,
    clientEmail: string,
    invoiceName: string,
    invoiceDescription: string,
    invoiceAmount: number,
    vat: number,
    total: number,
    paymentLink: string,
  ) {
    nunjucks.configure({ autoescape: true });
    return nunjucks.renderString(
      fs.readFileSync(path.join(__dirname, '/invoice.html')).toString('utf-8'),
      {
        invoiceId,
        invoiceCreated,
        clientName,
        clientEmail,
        invoiceName,
        invoiceDescription,
        invoiceAmount,
        vat,
        total,
        paymentLink,
      },
    );
  },
  invoicePaid(
    clientName: string,
    invoiceName: string,
    clientEmail: string,
    total: number,
  ) {
    nunjucks.configure({ autoescape: true });
    return nunjucks.renderString(
      fs
        .readFileSync(path.join(__dirname, '/invoicePaid.html'))
        .toString('utf-8'),
      {
        clientName,
        invoiceName,
        clientEmail,
        total,
      },
    );
  },
};
export default EmailTemplates;
