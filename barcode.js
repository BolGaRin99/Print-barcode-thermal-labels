document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('barcode-input').addEventListener('keyup', generateBarcode);
    document.getElementById('barcode-type').addEventListener('click', generateBarcode);
    document.getElementById('barcode-print-button').addEventListener('click', function() {
        printBarcode();
    });

    function generateBarcode() {
        var barcodeData = document.getElementById('barcode-input').value;
        var barcodeType = document.getElementById('barcode-type').value;
        var barcodePrintArea = document.getElementById('barcode-print-area');

        barcodePrintArea.innerHTML = '';

        if (!validateBarcodeLength(barcodeData, barcodeType)) {
            document.getElementById('info-box').style.display = "block";
            document.getElementById('barcode-print-area').style.display = "none";
            document.getElementById('barcode-print-button').style.display = "none";
            return;
        } else {
            document.getElementById('info-box').style.display = "none";
            document.getElementById('barcode-print-area').style.display = "block";
            document.getElementById('barcode-print-button').style.display = "block";
        }

        var imgElement = document.createElement('img');
        imgElement.id = 'barcode-img';
        barcodePrintArea.appendChild(imgElement);

        JsBarcode(imgElement, barcodeData, {
            format: barcodeType,
            width: 1,
            height: 50,
            displayValue: true
        });
    }

    function validateBarcodeLength(data, type) {
        var length = data.length;
        switch (type) {
            case 'ean13':
                return length === 12 || length === 13;
            case 'code128':
            case 'code39':
                return length > 0;
            default:
                return false;
        }
    }

    function printBarcode() {
        var printContent = document.getElementById('barcode-print-area').innerHTML;
        var printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write('<html><head><title>Print Barcode</title>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }
});