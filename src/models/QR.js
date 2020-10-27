export const QR = {
    Manufacturer: '',
    ProductItem: '',
    ProductName: '',
    ExpirationData: '',
    ProductDescription: '',
};

export const isValidateQR = (qr) => {
    return (qr.Manufacturer !== ""
    || qr.ProductItem !== ""
    || qr.ProductName !== ""
    || qr.ExpirationData !== ""
    || qr.ProductDescription !== "");
};