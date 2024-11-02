document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('text-input').addEventListener('input', updatePrintArea);
    document.getElementById('label-size').addEventListener('change', updatePrintArea);
    document.getElementById('font-size').addEventListener('change', updatePrintArea);
    document.getElementById('multi-page').addEventListener('change', updatePrintArea);
    document.getElementById('print-button').addEventListener('click', function() {
        printLabel();
    });

    function updatePrintArea() {
        var text = document.getElementById('text-input').value;
        var labelSize = document.getElementById('label-size').value;
        var fontSize = document.getElementById('font-size').value;
        var multiPage = document.getElementById('multi-page').checked;
        var printArea = document.getElementById('print-area');

        var dimensions = labelSize.split('x');
        var width = parseInt(dimensions[0]);
        var height = parseInt(dimensions[1]);

        printArea.style.width = width + 'mm';
        printArea.style.height = height + 'mm';
        printArea.style.border = '1px solid black';
        printArea.style.padding = '10px';
        printArea.style.margin = '20px auto';
        printArea.style.textAlign = 'center';
        printArea.style.overflow = 'hidden';

        if (multiPage) {
            var lines = text.split('\n');
            printArea.innerHTML = '';
            lines.forEach(line => {
                printArea.innerHTML += '<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:' + fontSize + 'px;">' + line + '</div><hr>';
            });
        } else {
            printArea.innerHTML = '<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:' + fontSize + 'px;">' + text + '</div>';
        }
    }

    function printLabel() {
        var multiPage = document.getElementById('multi-page').checked;
        var text = document.getElementById('text-input').value;
        var fontSize = document.getElementById('font-size').value;
        var lines = text.split('\n');

        var printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write('<html><head><title>Print Label</title></head><body>');

        if (multiPage) {
            lines.forEach(line => {
                printWindow.document.write('<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:' + fontSize + 'px; page-break-after: always;">' + line + '</div>');
            });
        } else {
            printWindow.document.write('<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:' + fontSize + 'px;">' + text + '</div>');
        }

        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
    }

    updatePrintArea();
});